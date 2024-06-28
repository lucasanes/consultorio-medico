import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail } from 'class-validator';
import { CreateUserDTO } from './create-user';

@InputType()
export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  name: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  password: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  role: Role;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  isValidated: boolean;
}
