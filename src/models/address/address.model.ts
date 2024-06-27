import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Doctor } from '../doctor/doctor.model';

@ObjectType()
export class Address {
  @Field(() => Int)
  id: number;

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

  @Field(() => Doctor)
  doctor: Doctor;
}
