import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateAddressDTO {
  @Field()
  @IsNotEmpty()
  @IsString()
  street: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  neighborhood: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  complement: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  city: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  state: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  doctorId: number;
}
