import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateDoctorDTO {
  @ApiProperty()
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @Field()
  @IsNotEmpty()
  @IsString()
  specialty: string;

  @ApiProperty()
  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  addressId?: number;
}
