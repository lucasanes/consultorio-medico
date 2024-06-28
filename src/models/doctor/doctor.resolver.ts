import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FindOneParamsGraphQL } from '../../dto/FindOneParamsGraphQL';
import { Doctor } from './doctor.model';
import { DoctorService } from './doctor.service';
import { CreateDoctorDTO } from './dto/create-doctor';
import { UpdateDoctorIdDTO } from './dto/update-doctor-id';

@Resolver(() => Doctor)
export class DoctorResolver {
  constructor(private readonly doctorService: DoctorService) {}

  @Query(() => [Doctor], { name: 'doctors' })
  findAll() {
    return this.doctorService.findAll();
  }

  @Query(() => Doctor, { name: 'doctor' })
  findOne(@Args('params') params: FindOneParamsGraphQL) {
    return this.doctorService.findOne(+params.id);
  }

  @Mutation(() => Doctor)
  createDoctor(
    @Args('createDoctorDTO')
    createDoctorDTO: CreateDoctorDTO,
  ) {
    return this.doctorService.create(createDoctorDTO);
  }

  @Mutation(() => Doctor)
  updateDoctor(
    @Args('updateDoctorDTO')
    updateDoctorDTO: UpdateDoctorIdDTO,
  ) {
    return this.doctorService.update(updateDoctorDTO.id, updateDoctorDTO);
  }

  @Mutation(() => Doctor)
  removeDoctor(@Args('params') params: FindOneParamsGraphQL) {
    return this.doctorService.remove(+params.id);
  }
}
