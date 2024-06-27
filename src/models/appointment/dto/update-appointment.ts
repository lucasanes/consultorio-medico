import { Field, InputType, Int } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateAppointmentDTO } from './create-appointment';

@InputType()
export class UpdateAppointmentDTO extends PartialType(CreateAppointmentDTO) {
  @Field(() => Int)
  @IsNotEmpty()
  id: number;
}
