import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsString, Matches } from 'class-validator';

@InputType()
export class CreateAppointmentDTO {
  @ApiProperty()
  @Field()
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in the format YYYY-MM-DD',
  })
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
