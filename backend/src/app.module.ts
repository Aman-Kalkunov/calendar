import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.modules';
import { CategoryTagsModule } from './category-tags/category-tags.modules';
import { appConfig } from './config/app.config';
import { authConfig } from './config/auth.config';
import { envValidationSchema } from './config/env.validation';
import { EventTagsModule } from './event-tags/event-tags.modules';
import { EventsModule } from './events/events.modules';
import { TagsModule } from './tags/tags.modules';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
      load: [authConfig, appConfig],
    }),

    PrismaModule,
    AuthModule,
    CategoriesModule,
    CategoryTagsModule,
    EventTagsModule,
    EventsModule,
    TagsModule,
    UsersModule,
  ],
})
export class AppModule {}
