import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CategoryTagsService } from './category-tags.service';

@Controller('category-tags')
export class CategoryTagsController {
  constructor(private readonly service: CategoryTagsService) {}

  @Post(':categoryId/:tagId')
  addCategoryTag(
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
    @Param('tagId', ParseUUIDPipe) tagId: string,
  ) {
    return this.service.addCategoryTag(categoryId, tagId);
  }

  @Delete(':categoryId/:tagId')
  removeCategoryTag(
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
    @Param('tagId', ParseUUIDPipe) tagId: string,
  ) {
    return this.service.removeCategoryTag(categoryId, tagId);
  }

  @Get(':categoryId')
  getCategoriesTags(@Param('categoryId', ParseUUIDPipe) categoryId: string) {
    return this.service.getCategoriesTags(categoryId);
  }
}
