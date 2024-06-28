import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserDTO {
  @ApiProperty()
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @Field()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Field()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @Field()
  @IsNotEmpty()
  @IsString()
  role: Role;
}
