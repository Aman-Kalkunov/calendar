import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Get()
  getAllCategories(@Query('userId') userId: string) {
    return this.service.getAllCategories(userId);
  }

  @Get(':id')
  getCategoryById(@Param('id') id: string) {
    return this.service.getCategoryById(id);
  }

  @Post()
  createCategory(
    @Query('userId') userId: string,
    @Body() dto: CreateCategoryDto,
  ) {
    return this.service.createCategory(userId, {
      name: dto.name,
      color: dto.color,
      form: dto.form,
    });
  }

  @Patch(':id')
  updateCategory(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.service.updateCategory(id, {
      name: dto.name,
      color: dto.color,
      form: dto.form,
    });
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    return this.service.deleteCategory(id);
  }
}
