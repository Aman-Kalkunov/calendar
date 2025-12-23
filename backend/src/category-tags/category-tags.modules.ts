import { Module } from '@nestjs/common';
import { CategoryTagsController } from './category-tags.controller';
import { CategoryTagsService } from './category-tags.service';

@Module({
  providers: [CategoryTagsService],
  controllers: [CategoryTagsController],
  exports: [CategoryTagsService],
})
export class CategoryTagsModule {}
