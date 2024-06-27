import { Field, InputType, Int } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDTO } from './create-patient';

@InputType()
export class UpdatePatientDTO extends PartialType(CreatePatientDTO) {
  @Field(() => Int)
  id: number;
}
