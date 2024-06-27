import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class FindOneParamsGraphQL {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  id: number;
}
