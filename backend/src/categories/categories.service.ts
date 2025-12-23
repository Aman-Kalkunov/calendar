import { Injectable } from '@nestjs/common';
import { Form } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  getAllCategories(userId: string) {
    return this.prisma.category.findMany({ where: { userId } });
  }

  getCategoryById(id: string) {
    return this.prisma.category.findUnique({ where: { id } });
  }

  createCategory(
    userId: string,
    data: { name: string; form: Form; color: string },
  ) {
    return this.prisma.category.create({ data: { ...data, userId } });
  }

  updateCategory(
    id: string,
    data: Partial<{ name: string; form: Form; color: string }>,
  ) {
    return this.prisma.category.update({ where: { id }, data });
  }

  deleteCategory(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}
