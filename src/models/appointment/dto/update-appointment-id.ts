import { Field, InputType, Int } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Matches } from 'class-validator';
import { CreateAppointmentDTO } from './create-appointment';

@InputType()
export class UpdateAppointmentIdDTO extends PartialType(CreateAppointmentDTO) {
  @ApiProperty()
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in the format YYYY-MM-DD',
  })
  id: number;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  date?: string;

  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  doctorId?: number;

  @ApiProperty({ required: false })
  @Field(() => [Int], { nullable: true })
  patientsId?: number[];
}
