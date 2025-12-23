import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'prisma/prisma.service';
import { authConfig } from 'src/config/auth.config';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(authConfig.KEY)
    private readonly auth: ConfigType<typeof authConfig>,
  ) {}

  private async saveRefreshToken(
    tx: Prisma.TransactionClient,
    userId: string,
    refreshToken: string,
  ) {
    const hash = await bcrypt.hash(refreshToken, this.auth.bcryptSaltRounds);

    await this.usersService.updateUserWithTx(tx, userId, {
      refreshTokenHash: hash,
    });
  }

  private async signTokens(userId: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId },
        { expiresIn: this.auth.accessTokenTtl },
      ),
      this.jwtService.signAsync(
        { sub: userId },
        { expiresIn: this.auth.refreshTokenTtl },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  async me(userId: string) {
    return this.usersService.getUserById(userId);
  }

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(
      dto.password,
      this.auth.bcryptSaltRounds,
    );

    return this.prisma.$transaction(async (tx) => {
      const user = await this.usersService.createUserWithTx(tx, {
        login: dto.login,
        password: hashedPassword,
        timezone: dto.timezone,
      });

      const tokens = await this.signTokens(user.id);
      await this.saveRefreshToken(tx, user.id, tokens.refreshToken);

      return tokens;
    });
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.getUserByLogin(dto.login);
    if (!user) {
      throw new UnauthorizedException();
    }

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) {
      throw new UnauthorizedException();
    }

    return this.prisma.$transaction(async (tx) => {
      const tokens = await this.signTokens(user.id);
      await this.saveRefreshToken(tx, user.id, tokens.refreshToken);

      return tokens;
    });
  }

  async logout(userId: string) {
    return this.prisma.$transaction(async (tx) => {
      await this.usersService.updateUserWithTx(tx, userId, {
        refreshTokenHash: undefined,
      });
    });
  }

  async refresh(userId: string, refreshToken: string | null) {
    const user = await this.usersService.getUserById(userId);
    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException();
    }
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const matches = await bcrypt.compare(refreshToken, user.refreshTokenHash);
    if (!matches) {
      throw new UnauthorizedException();
    }

    return this.prisma.$transaction(async (tx) => {
      const tokens = await this.signTokens(user.id);
      await this.saveRefreshToken(tx, user.id, tokens.refreshToken);

      return tokens;
    });
  }
}
