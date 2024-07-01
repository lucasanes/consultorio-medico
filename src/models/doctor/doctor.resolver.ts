import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminGuard } from '../../common/guards/admin.guard';
import { AuthGuard } from '../../common/guards/auth.guard';
import { FindOneParamsGraphQL } from '../../dto/FindOneParamsGraphQL';
import { Doctor } from './doctor.model';
import { DoctorService } from './doctor.service';
import { CreateDoctorDTO } from './dto/create-doctor';
import { UpdateDoctorIdDTO } from './dto/update-doctor-id';

@Resolver(() => Doctor)
export class DoctorResolver {
  constructor(private readonly doctorService: DoctorService) {}

  @UseGuards(AuthGuard)
  @Query(() => [Doctor], { name: 'doctors' })
  findAll(): Promise<Doctor[]> {
    return this.doctorService.findAll();
  }

  @UseGuards(AuthGuard)
  @Query(() => Doctor, { name: 'doctor' })
  findOne(@Args('params') params: FindOneParamsGraphQL): Promise<Doctor> {
    return this.doctorService.findOne(+params.id);
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Doctor)
  createDoctor(
    @Args('createDoctorDTO')
    createDoctorDTO: CreateDoctorDTO,
  ): Promise<Doctor> {
    return this.doctorService.create(createDoctorDTO);
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Doctor)
  updateDoctor(
    @Args('updateDoctorDTO')
    updateDoctorDTO: UpdateDoctorIdDTO,
  ): Promise<Doctor> {
    return this.doctorService.update(updateDoctorDTO.id, updateDoctorDTO);
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Doctor)
  removeDoctor(@Args('params') params: FindOneParamsGraphQL): Promise<Doctor> {
    return this.doctorService.remove(+params.id);
  }
}
