import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MsgResponse {
  @Field(() => String)
  msg: string;
}
