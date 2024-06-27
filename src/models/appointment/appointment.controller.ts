import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDTO } from './dto/create-appointment';
import { UpdateAppointmentDTO } from './dto/update-appointment';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.appointmentService.findOne(+id);
  }

  @Post()
  create(
    @Body()
    createAppointmentDTO: CreateAppointmentDTO,
  ) {
    return this.appointmentService.create(createAppointmentDTO);
  }

  @Patch(':id')
  update(
    @Param('id')
    id: string,
    @Body()
    updateAppointmentDTO: UpdateAppointmentDTO,
  ) {
    return this.appointmentService.update(+id, updateAppointmentDTO);
  }

  @Delete(':id')
  remove(
    @Param('id')
    id: string,
  ) {
    return this.appointmentService.remove(+id);
  }
}
