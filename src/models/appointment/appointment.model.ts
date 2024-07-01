import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Doctor } from '../doctor/doctor.model';
import { PatientAppointment } from '../patientAppointment/patientAppointment.model';

@ObjectType()
export class Appointment {
  @Field(() => Int)
  id: number;

  @Field()
  date: string;

  @Field(() => Int)
  doctorId: number;

  @Field(() => Doctor)
  doctor?: Doctor;

  @Field(() => [PatientAppointment], { nullable: 'items' })
  patients?: PatientAppointment[];
}
