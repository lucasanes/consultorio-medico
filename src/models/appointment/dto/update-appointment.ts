import { Field, InputType, Int } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';
import { CreateAppointmentDTO } from './create-appointment';

@InputType()
export class UpdateAppointmentDTO extends PartialType(CreateAppointmentDTO) {
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in the format YYYY-MM-DD',
  })
  date?: string;

  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  doctorId?: number;

  @ApiProperty({ required: false })
  @Field(() => [Int], { nullable: true })
  patientsId?: number[];
}
