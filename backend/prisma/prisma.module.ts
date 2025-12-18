import { Global, Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
