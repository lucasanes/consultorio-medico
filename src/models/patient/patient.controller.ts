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
import { CreatePatientDTO } from './dto/create-patient';
import { UpdatePatientDTO } from './dto/update-patient';
import { PatientService } from './patient.service';

@ApiTags('patient')
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param() params: FindOneParams) {
    return this.patientService.findOne(+params.id);
  }

  @Post()
  @UseGuards(AdminGuard)
  create(
    @Body(new ValidationPipe())
    createPatientDTO: CreatePatientDTO,
  ) {
    return this.patientService.create(createPatientDTO);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(
    @Param() params: FindOneParams,
    @Body(new ValidationPipe())
    updatePatientDTO: UpdatePatientDTO,
  ) {
    return this.patientService.update(+params.id, updatePatientDTO);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param() params: FindOneParams) {
    return this.patientService.remove(+params.id);
  }
}
