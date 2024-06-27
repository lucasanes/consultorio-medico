import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Appointment } from '../appointment/appointment.model';
import { Patient } from '../patient/patient.model';

@ObjectType()
export class PatientAppointment {
  @Field(() => Int)
  id: number;

  @Field(() => Patient)
  patient: Patient;

  @Field(() => Appointment)
  appointment: Appointment;
}
