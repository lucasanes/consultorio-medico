import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePatientDTO {
  @Field()
  name: string;

  @Field(() => Int)
  age: number;
}
