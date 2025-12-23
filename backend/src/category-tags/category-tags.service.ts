import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CategoryTagsService {
  constructor(private prisma: PrismaService) {}

  addCategoryTag(categoryId: string, tagId: string) {
    return this.prisma.categoryTag.create({
      data: { categoryId, tagId },
    });
  }

  removeCategoryTag(categoryId: string, tagId: string) {
    return this.prisma.categoryTag.delete({
      where: { categoryId_tagId: { categoryId, tagId } },
    });
  }

  getCategoriesTags(categoryId: string) {
    return this.prisma.categoryTag.findMany({
      where: { categoryId },
      include: { tag: true },
    });
  }
}
