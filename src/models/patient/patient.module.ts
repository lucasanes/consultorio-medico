import { Module } from '@nestjs/common';

import { PrismaModule } from '../../modules/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { PatientController } from './patient.controller';
import { PatientResolver } from './patient.resolver';
import { PatientService } from './patient.service';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [PatientService, PatientResolver],
  controllers: [PatientController],
})
export class PatientModule {}
