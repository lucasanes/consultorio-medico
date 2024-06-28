import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SignInUserDTO {
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
}
