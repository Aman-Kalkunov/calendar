import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  getUserById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  getUserByLogin(login: string) {
    return this.prisma.user.findUnique({ where: { login } });
  }

  updateUser(
    id: string,
    data: Partial<{
      password: string;
      timezone?: string;
      refreshTokenHash: string;
    }>,
  ) {
    return this.prisma.user.update({ where: { id }, data });
  }

  updateUserWithTx(
    tx: Prisma.TransactionClient,
    id: string,
    data: Partial<{
      password: string;
      timezone?: string;
      refreshTokenHash?: string | null;
    }>,
  ) {
    return tx.user.update({ where: { id }, data });
  }

  createUserWithTx(
    tx: Prisma.TransactionClient,
    data: { login: string; password: string; timezone?: string },
  ) {
    return tx.user.create({ data });
  }

  deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
