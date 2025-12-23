import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class EventTagsService {
  constructor(private prisma: PrismaService) {}

  addEventTag(eventId: string, tagId: string) {
    return this.prisma.eventTag.create({
      data: { eventId, tagId },
    });
  }

  removeEventTag(eventId: string, tagId: string) {
    return this.prisma.eventTag.delete({
      where: { eventId_tagId: { eventId, tagId } },
    });
  }

  getEventsTags(eventId: string) {
    return this.prisma.eventTag.findMany({
      where: { eventId },
      include: { tag: true },
    });
  }
}
