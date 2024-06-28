import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FindOneParamsGraphQL } from '../../dto/FindOneParamsGraphQL';
import { CreatePatientDTO } from './dto/create-patient';
import { UpdatePatientIdDTO } from './dto/update-patient-id';
import { Patient } from './patient.model';
import { PatientService } from './patient.service';

@Resolver(() => Patient)
export class PatientResolver {
  constructor(private readonly patientService: PatientService) {}

  @Query(() => [Patient], { name: 'patients' })
  findAll() {
    return this.patientService.findAll();
  }

  @Query(() => Patient, { name: 'patient' })
  findOne(@Args('params') params: FindOneParamsGraphQL) {
    return this.patientService.findOne(+params.id);
  }

  @Mutation(() => Patient)
  createPatient(
    @Args('createPatientDTO')
    createPatientDTO: CreatePatientDTO,
  ) {
    return this.patientService.create(createPatientDTO);
  }

  @Mutation(() => Patient)
  updatePatient(
    @Args('updatePatientDTO')
    updatePatientDTO: UpdatePatientIdDTO,
  ) {
    return this.patientService.update(updatePatientDTO.id, updatePatientDTO);
  }

  @Mutation(() => Patient)
  removePatient(@Args('params') params: FindOneParamsGraphQL) {
    return this.patientService.remove(+params.id);
  }
}
