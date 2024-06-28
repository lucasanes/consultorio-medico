import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../../common/guards/admin.guard';
import { AuthGuard } from '../../common/guards/auth.guard';
import { FindOneParams } from '../../dto/FindOneParams';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDTO } from './dto/create-appointment';
import { UpdateAppointmentDTO } from './dto/update-appointment';

@ApiTags('appointment')
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param() params: FindOneParams) {
    return this.appointmentService.findOne(+params.id);
  }

  @Post()
  @UseGuards(AdminGuard)
  create(
    @Body(new ValidationPipe())
    createAppointmentDTO: CreateAppointmentDTO,
  ) {
    return this.appointmentService.create(createAppointmentDTO);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(
    @Param() params: FindOneParams,
    @Body(new ValidationPipe())
    updateAppointmentDTO: UpdateAppointmentDTO,
  ) {
    return this.appointmentService.update(+params.id, updateAppointmentDTO);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param() params: FindOneParams) {
    return this.appointmentService.remove(+params.id);
  }
}
