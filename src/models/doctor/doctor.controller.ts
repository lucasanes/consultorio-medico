import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../../common/guards/admin.guard';
import { AuthGuard } from '../../common/guards/auth.guard';
import { FindOneParams } from '../../dto/FindOneParams';
import { DoctorService } from './doctor.service';
import { CreateDoctorDTO } from './dto/create-doctor';
import { UpdateDoctorDTO } from './dto/update-doctor';

@ApiTags('doctor')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param() params: FindOneParams) {
    return this.doctorService.findOne(+params.id);
  }

  @Post()
  @UseGuards(AdminGuard)
  create(
    @Body()
    createDoctorDTO: CreateDoctorDTO,
  ) {
    return this.doctorService.create(createDoctorDTO);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(
    @Param() params: FindOneParams,
    @Body()
    updateDoctorDTO: UpdateDoctorDTO,
  ) {
    return this.doctorService.update(+params.id, updateDoctorDTO);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param() params: FindOneParams) {
    return this.doctorService.remove(+params.id);
  }
}
