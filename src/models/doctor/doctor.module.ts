import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { DoctorController } from './doctor.controller';
import { DoctorResolver } from './doctor.resolver';
import { DoctorService } from './doctor.service';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [DoctorService, DoctorResolver],
  controllers: [DoctorController],
})
export class DoctorModule {}
