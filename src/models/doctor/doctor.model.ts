import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Address } from '../address/address.model';
import { Appointment } from '../appointment/appointment.model';

@ObjectType()
export class Doctor {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  specialty: string;

  @Field(() => Address, { nullable: true })
  address?: Address;

  @Field(() => [Appointment], { nullable: 'items' })
  appointments?: Appointment[];
}
