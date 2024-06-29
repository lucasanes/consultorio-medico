import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class ForgotPasswordDTO {
  @ApiProperty()
  @Field()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
