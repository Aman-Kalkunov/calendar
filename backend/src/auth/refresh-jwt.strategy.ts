import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { authConfig } from '../config/auth.config';
import { JwtUser } from './types/jwt-user.type';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @Inject(authConfig.KEY)
    private readonly auth: ConfigType<typeof authConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const token = req?.cookies?.refreshToken as string | undefined;
          return typeof token === 'string' ? token : null;
        },
      ]),
      secretOrKey: auth.jwtSecret,
    });
  }

  validate(payload: { sub: string }, req: Request): JwtUser {
    const refreshToken = req.cookies.refreshToken as string | undefined;
    return {
      userId: payload.sub,
      refreshToken: refreshToken ?? null,
    };
  }
}
