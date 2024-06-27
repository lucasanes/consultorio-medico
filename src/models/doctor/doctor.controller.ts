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
import { FindOneParams } from '../../dto/FindOneParams';
import { DoctorService } from './doctor.service';
import { CreateDoctorDTO } from './dto/create-doctor';
import { UpdateDoctorDTO } from './dto/update-doctor';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return this.doctorService.findOne(+params.id);
  }

  @Post()
  create(
    @Body(new ValidationPipe())
    createDoctorDTO: CreateDoctorDTO,
  ) {
    return this.doctorService.create(createDoctorDTO);
  }

  @Patch(':id')
  update(
    @Param() params: FindOneParams,
    @Body(new ValidationPipe())
    updateDoctorDTO: UpdateDoctorDTO,
  ) {
    return this.doctorService.update(+params.id, updateDoctorDTO);
  }

  @Delete(':id')
  remove(@Param() params: FindOneParams) {
    return this.doctorService.remove(+params.id);
  }
}
