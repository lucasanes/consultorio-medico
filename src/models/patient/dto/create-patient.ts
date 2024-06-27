import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePatientDTO {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  age: number;
}
