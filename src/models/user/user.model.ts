import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Role } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  role: Role;
}
