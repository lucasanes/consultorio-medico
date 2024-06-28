import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateAppointmentDTO {
  @ApiProperty()
  @Field()
  @IsNotEmpty()
  @IsString()
  date: string;

  @ApiProperty()
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  doctorId: number;

  @ApiProperty()
  @Field(() => [Int])
  @IsNotEmpty()
  @IsArray()
  patientsId: number[];
}
