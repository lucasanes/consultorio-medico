import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateDoctorDTO {
  @Field()
  name: string;

  @Field()
  specialty: string;

  @Field(() => Int, { nullable: true })
  enderecoId?: number;
}
