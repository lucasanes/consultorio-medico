import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { PatientController } from './patient.controller';
import { PatientResolver } from './patient.resolver';
import { PatientService } from './patient.service';

@Module({
  imports: [PrismaModule],
  providers: [PatientService, PatientResolver],
  controllers: [PatientController],
})
export class PatientModule {}
