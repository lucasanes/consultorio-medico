import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { DoctorController } from './doctor.controller';
import { DoctorResolver } from './doctor.resolver';
import { DoctorService } from './doctor.service';

@Module({
  imports: [PrismaModule],
  providers: [DoctorService, DoctorResolver],
  controllers: [DoctorController],
})
export class DoctorModule {}
