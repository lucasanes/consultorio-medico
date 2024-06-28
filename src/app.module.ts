import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AddressModule } from './models/address/address.module';
import { AppointmentModule } from './models/appointment/appointment.module';
import { DoctorModule } from './models/doctor/doctor.module';
import { PatientModule } from './models/patient/patient.module';

@Module({
  imports: [
    DoctorModule,
    PatientModule,
    AppointmentModule,
    AddressModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }),
    }),
  ],
})
export class AppModule {}
