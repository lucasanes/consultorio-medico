import { Field, InputType, Int } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreateAddressDTO } from './create-address';

@InputType()
export class UpdateAddressIdDTO extends PartialType(CreateAddressDTO) {
  @ApiProperty()
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  id: number;

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
