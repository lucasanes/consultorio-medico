import { Field, InputType, Int } from '@nestjs/graphql';
import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateAppointmentDTO {
  @Field()
  @IsNotEmpty()
  @IsString()
  date: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  doctorId: number;

  @Field(() => [Int])
  @IsNotEmpty()
  @IsArray()
  patientsId: number[];
}
