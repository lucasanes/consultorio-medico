import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateDoctorDTO {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  specialty: string;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  enderecoId?: number;
}
