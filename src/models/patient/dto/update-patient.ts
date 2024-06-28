import { Field, InputType, Int } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePatientDTO } from './create-patient';

@InputType()
export class UpdatePatientDTO extends PartialType(CreatePatientDTO) {
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  name?: string;

  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  age?: number;
}
