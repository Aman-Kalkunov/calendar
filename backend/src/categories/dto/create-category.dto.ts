import { Form } from '@prisma/client';
import {
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  name: string;

  @IsEnum(Form)
  form: Form;

  @IsHexColor()
  color: string;
}
