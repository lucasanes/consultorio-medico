import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateAppointmentDTO {
  @Field()
  date: string;

  @Field(() => Int)
  doctorId: number;

  @Field(() => [Int])
  patientsId: number[];
}
