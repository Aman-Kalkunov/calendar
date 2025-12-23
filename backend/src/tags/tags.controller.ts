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
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly service: TagsService) {}

  @Get()
  getAllTags(@Query('userId') userId: string) {
    return this.service.getAllTags(userId);
  }

  @Get(':id')
  getTagById(@Param('id') id: string) {
    return this.service.getTagById(id);
  }

  @Post()
  createTag(@Query('userId') userId: string, @Body() dto: CreateTagDto) {
    return this.service.createTag(userId, { name: dto.name });
  }

  @Patch(':id')
  updateTag(@Param('id') id: string, @Body() dto: UpdateTagDto) {
    return this.service.updateTag(id, { name: dto.name });
  }

  @Delete(':id')
  deleteTag(@Param('id') id: string) {
    return this.service.deleteTag(id);
  }
}
