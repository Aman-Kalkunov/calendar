import { Module } from '@nestjs/common';
import { EventTagsController } from './event-tags.controller';
import { EventTagsService } from './event-tags.service';

@Module({
  providers: [EventTagsService],
  controllers: [EventTagsController],
  exports: [EventTagsService],
})
export class EventTagsModule {}
