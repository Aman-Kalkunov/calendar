import { registerAs } from '@nestjs/config';
import { StringValue } from 'ms';

export const authConfig = registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET as string,

  accessTokenTtl: process.env.JWT_ACCESS_EXPIRES_IN as StringValue,
  refreshTokenTtl: process.env.JWT_REFRESH_EXPIRES_IN as StringValue,
  refreshTokenCookieTtlMs: Number(process.env.JWT_REFRESH_COOKIE_EXPIRES_IN_MS),

  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS),
}));
