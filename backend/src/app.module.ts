import { Module } from '@nestjs/common';
import { PrismaModule, UsersModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule, UsersModule],
})
export class AppModule {}
