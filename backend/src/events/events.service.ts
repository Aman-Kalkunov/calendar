import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  getAllEvents(userId: string) {
    return this.prisma.event.findMany({ where: { userId } });
  }

  getEventById(id: string) {
    return this.prisma.event.findUnique({ where: { id } });
  }

  async createEvent(
    userId: string,
    data: {
      categoryId: string;
      title: string;
      startDateTime: Date;
      endDateTime?: Date;
      color?: string;
      description?: string;
    },
  ) {
    const category = await this.prisma.category.findUnique({
      where: { id: data.categoryId },
    });
    if (!category) throw new Error('Category not found');

    return this.prisma.event.create({
      data: {
        ...data,
        userId,
        color: data.color ?? category.color,
      },
    });
  }

  updateEvent(
    id: string,
    data: Partial<{
      title: string;
      description?: string;
      startDateTime: Date;
      endDateTime?: Date;
      color?: string;
    }>,
  ) {
    return this.prisma.event.update({ where: { id }, data });
  }

  deleteEvent(id: string) {
    return this.prisma.event.delete({ where: { id } });
  }
}
