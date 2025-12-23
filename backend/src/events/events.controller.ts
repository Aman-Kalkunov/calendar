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
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly service: EventsService) {}

  @Get()
  getAllEvents(@Query('userId') userId: string) {
    return this.service.getAllEvents(userId);
  }

  @Get(':id')
  getEventById(@Param('id') id: string) {
    return this.service.getEventById(id);
  }

  @Post()
  createEvent(
    @Query('userId') userId: string,
    @Body()
    dto: CreateEventDto,
  ) {
    return this.service.createEvent(userId, {
      categoryId: dto.categoryId,
      title: dto.title,
      description: dto.description,
      startDateTime: new Date(dto.startDateTime),
      endDateTime: dto.endDateTime ? new Date(dto.endDateTime) : undefined,
      color: dto.color,
    });
  }

  @Patch(':id')
  updateEvent(
    @Param('id') id: string,
    @Body()
    dto: UpdateEventDto,
  ) {
    return this.service.updateEvent(id, {
      title: dto.title,
      description: dto.description,
      startDateTime: dto.startDateTime
        ? new Date(dto.startDateTime)
        : undefined,
      endDateTime: dto.endDateTime ? new Date(dto.endDateTime) : undefined,
      color: dto.color,
    });
  }

  @Delete(':id')
  deleteEvent(@Param('id') id: string) {
    return this.service.deleteEvent(id);
  }
}
