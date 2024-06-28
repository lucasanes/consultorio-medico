import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindOneParams } from '../../dto/FindOneParams';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDTO } from './dto/create-appointment';
import { UpdateAppointmentDTO } from './dto/update-appointment';

@ApiTags('appointment')
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return this.appointmentService.findOne(+params.id);
  }

  @Post()
  create(
    @Body(new ValidationPipe())
    createAppointmentDTO: CreateAppointmentDTO,
  ) {
    return this.appointmentService.create(createAppointmentDTO);
  }

  @Patch(':id')
  update(
    @Param() params: FindOneParams,
    @Body(new ValidationPipe())
    updateAppointmentDTO: UpdateAppointmentDTO,
  ) {
    return this.appointmentService.update(+params.id, updateAppointmentDTO);
  }

  @Delete(':id')
  remove(@Param() params: FindOneParams) {
    return this.appointmentService.remove(+params.id);
  }
}
