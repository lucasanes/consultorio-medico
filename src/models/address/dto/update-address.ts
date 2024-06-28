import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAddressDTO } from './create-address';

@InputType()
export class UpdateAddressDTO extends PartialType(CreateAddressDTO) {
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  street?: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  neighborhood?: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  complement?: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  city?: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  state?: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  doctorId?: number;
}
