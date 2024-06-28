import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

@InputType()
export class FindOneParams {
  @ApiProperty({ description: 'ID' })
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumberString()
  id: number;
}
