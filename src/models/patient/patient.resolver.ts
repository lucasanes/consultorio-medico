import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePatientDTO } from './dto/create-patient';
import { UpdatePatientDTO } from './dto/update-patient';
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
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.patientService.findOne(id);
  }

  @Mutation(() => Patient)
  createPatient(@Args('createPatientDTO') createPatientDTO: CreatePatientDTO) {
    return this.patientService.create(createPatientDTO);
  }

  @Mutation(() => Patient)
  updatePatient(@Args('updatePatientDTO') updatePatientDTO: UpdatePatientDTO) {
    return this.patientService.update(updatePatientDTO.id, updatePatientDTO);
  }

  @Mutation(() => Patient)
  removePatient(@Args('id', { type: () => Int }) id: number) {
    return this.patientService.remove(id);
  }
}
