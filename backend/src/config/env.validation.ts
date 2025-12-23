import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  // App
  PORT: Joi.number().default(3000),

  // Database
  DATABASE_URL: Joi.string().uri().required(),

  // Auth
  JWT_SECRET: Joi.string().min(16).required(),

  JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),
  JWT_ACCESS_EXPIRES_IN: Joi.string().default('15m'),

  BCRYPT_SALT_ROUNDS: Joi.number()
    .integer()
    .min(4)
    .max(15)
    .required()
    .default(10),
});
