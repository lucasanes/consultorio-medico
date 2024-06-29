import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class ChangePasswordDTO {
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
  @Length(6, 6)
  code: string;

  @ApiProperty()
  @Field()
  @IsNotEmpty()
  @IsString()
  password: string;
}
