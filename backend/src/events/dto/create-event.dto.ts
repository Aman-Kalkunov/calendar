import {
  IsDateString,
  IsHexColor,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  startDateTime: string;

  @IsOptional()
  @IsDateString()
  endDateTime?: string;

  @IsHexColor()
  color: string;

  @IsString()
  @Length(25, 30)
  categoryId: string;

  @IsOptional()
  tagIds?: string[];
}
