import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumberString } from 'class-validator';

@InputType()
export class FindOneParams {
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumberString()
  id: number;
}
