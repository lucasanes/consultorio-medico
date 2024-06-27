import { Field, InputType, Int } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDTO } from './create-appointment';

@InputType()
export class UpdateAppointmentDTO extends PartialType(CreateAppointmentDTO) {
  @Field(() => Int)
  id: number;
}
