import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateAddressDTO {
  @Field()
  street: string;

  @Field()
  neighborhood: string;

  @Field()
  complement: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field(() => Int)
  doctorId: number;
}
