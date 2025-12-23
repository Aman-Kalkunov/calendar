import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  port: Number(process.env.PORT),
  isProduction: process.env.NODE_ENV === 'production',
}));
