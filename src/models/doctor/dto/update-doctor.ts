import { Field, InputType, PartialType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDoctorDTO } from './create-doctor';

@InputType()
export class UpdateDoctorDTO extends PartialType(CreateDoctorDTO) {
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  name?: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  specialty?: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  addressId?: number;
}
