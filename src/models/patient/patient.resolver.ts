import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminGuard } from '../../common/guards/admin.guard';
import { AuthGuard } from '../../common/guards/auth.guard';
import { FindOneParamsGraphQL } from '../../dto/FindOneParamsGraphQL';
import { CreatePatientDTO } from './dto/create-patient';
import { UpdatePatientIdDTO } from './dto/update-patient-id';
import { Patient } from './patient.model';
import { PatientService } from './patient.service';

@Resolver(() => Patient)
export class PatientResolver {
  constructor(private readonly patientService: PatientService) {}

  @UseGuards(AuthGuard)
  @Query(() => [Patient], { name: 'patients' })
  findAll() {
    return this.patientService.findAll();
  }

  @UseGuards(AuthGuard)
  @Query(() => Patient, { name: 'patient' })
  findOne(@Args('params') params: FindOneParamsGraphQL) {
    return this.patientService.findOne(+params.id);
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Patient)
  createPatient(
    @Args('createPatientDTO')
    createPatientDTO: CreatePatientDTO,
  ) {
    return this.patientService.create(createPatientDTO);
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Patient)
  updatePatient(
    @Args('updatePatientDTO')
    updatePatientDTO: UpdatePatientIdDTO,
  ) {
    return this.patientService.update(updatePatientDTO.id, updatePatientDTO);
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Patient)
  removePatient(@Args('params') params: FindOneParamsGraphQL) {
    return this.patientService.remove(+params.id);
  }
}
