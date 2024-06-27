import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateDoctorDTO } from './create-doctor';

@InputType()
export class UpdateDoctorDTO extends PartialType(CreateDoctorDTO) {
  @Field(() => Int)
  @IsNotEmpty()
  id: number;
}
