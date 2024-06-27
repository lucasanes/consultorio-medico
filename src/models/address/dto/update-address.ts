import { Field, InputType, Int } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateAddressDTO } from './create-address';

@InputType()
export class UpdateAddressDTO extends PartialType(CreateAddressDTO) {
  @Field(() => Int)
  @IsNotEmpty()
  id: number;
}
