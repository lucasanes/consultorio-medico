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
import { FindOneParams } from 'src/dto/FindOneParams';
import { CreatePatientDTO } from './dto/create-patient';
import { UpdatePatientDTO } from './dto/update-patient';
import { PatientService } from './patient.service';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return this.patientService.findOne(+params.id);
  }

  @Post()
  create(
    @Body(new ValidationPipe())
    createPatientDTO: CreatePatientDTO,
  ) {
    return this.patientService.create(createPatientDTO);
  }

  @Patch(':id')
  update(
    @Param() params: FindOneParams,
    @Body(new ValidationPipe())
    updatePatientDTO: UpdatePatientDTO,
  ) {
    return this.patientService.update(+params.id, updatePatientDTO);
  }

  @Delete(':id')
  remove(@Param() params: FindOneParams) {
    return this.patientService.remove(+params.id);
  }
}
