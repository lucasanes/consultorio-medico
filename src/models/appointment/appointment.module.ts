import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { AppointmentController } from './appointment.controller';
import { AppointmentResolver } from './appointment.resolver';
import { AppointmentService } from './appointment.service';

@Module({
  imports: [PrismaModule],
  providers: [AppointmentService, AppointmentResolver],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
