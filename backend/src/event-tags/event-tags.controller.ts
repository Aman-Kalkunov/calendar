import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { EventTagsService } from './event-tags.service';

@Controller('event-tags')
export class EventTagsController {
  constructor(private readonly service: EventTagsService) {}

  @Post(':eventId/:tagId')
  addEventTag(
    @Param('eventId', ParseUUIDPipe) eventId: string,
    @Param('tagId', ParseUUIDPipe) tagId: string,
  ) {
    return this.service.addEventTag(eventId, tagId);
  }

  @Delete(':eventId/:tagId')
  removeEventTag(
    @Param('eventId', ParseUUIDPipe) eventId: string,
    @Param('tagId', ParseUUIDPipe) tagId: string,
  ) {
    return this.service.removeEventTag(eventId, tagId);
  }

  @Get(':eventId')
  getEventsTags(@Param('eventId', ParseUUIDPipe) eventId: string) {
    return this.service.getEventsTags(eventId);
  }
}
