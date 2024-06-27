import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.doctorService.findOne(+id);
  }

  @Post()
  create(
    @Body()
    createDoctorDTO: CreateDoctorDTO,
  ) {
    return this.doctorService.create(createDoctorDTO);
  }

  @Patch(':id')
  update(
    @Param('id')
    id: string,
    @Body()
    updateDoctorDTO: UpdateDoctorDTO,
  ) {
    return this.doctorService.update(+id, updateDoctorDTO);
  }

  @Delete(':id')
  remove(
    @Param('id')
    id: string,
  ) {
    return this.doctorService.remove(+id);
  }
}
