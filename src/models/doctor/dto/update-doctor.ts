import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateDoctorDTO } from './create-doctor';

@InputType()
export class UpdateDoctorDTO extends PartialType(CreateDoctorDTO) {
  @Field(() => Int)
  id: number;
}
