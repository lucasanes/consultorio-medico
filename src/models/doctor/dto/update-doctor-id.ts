import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreateDoctorDTO } from './create-doctor';

@InputType()
export class UpdateDoctorIdDTO extends PartialType(CreateDoctorDTO) {
  @ApiProperty()
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  id: number;

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
