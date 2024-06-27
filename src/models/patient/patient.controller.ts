import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.patientService.findOne(+id);
  }

  @Post()
  create(
    @Body()
    createPatientDTO: CreatePatientDTO,
  ) {
    return this.patientService.create(createPatientDTO);
  }

  @Patch(':id')
  update(
    @Param('id')
    id: string,
    @Body()
    updatePatientDTO: UpdatePatientDTO,
  ) {
    return this.patientService.update(+id, updatePatientDTO);
  }

  @Delete(':id')
  remove(
    @Param('id')
    id: string,
  ) {
    return this.patientService.remove(+id);
  }
}
