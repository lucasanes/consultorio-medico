import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateAddressDTO {
  @ApiProperty()
  @Field()
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty()
  @Field()
  @IsNotEmpty()
  @IsString()
  neighborhood: string;

  @ApiProperty()
  @Field()
  @IsNotEmpty()
  @IsString()
  complement: string;

  @ApiProperty()
  @Field()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @Field()
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty()
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  doctorId: number;
}
