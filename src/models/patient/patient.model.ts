import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PatientAppointment } from '../patientAppointment/patientAppointment.model';

@ObjectType()
export class Patient {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  age: number;

  @Field(() => [PatientAppointment], { nullable: 'items' })
  appointments?: PatientAppointment[];
}
