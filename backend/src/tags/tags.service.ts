import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  getAllTags(userId: string) {
    return this.prisma.tag.findMany({ where: { userId } });
  }

  getTagById(id: string) {
    return this.prisma.tag.findUnique({ where: { id } });
  }

  createTag(userId: string, data: { name: string }) {
    return this.prisma.tag.create({ data: { ...data, userId } });
  }

  updateTag(id: string, data: Partial<{ name: string }>) {
    return this.prisma.tag.update({ where: { id }, data });
  }

  deleteTag(id: string) {
    return this.prisma.tag.delete({ where: { id } });
  }
}
