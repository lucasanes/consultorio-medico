import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Doctor } from './doctor.model';
import { DoctorService } from './doctor.service';
import { CreateDoctorDTO } from './dto/create-doctor';
import { UpdateDoctorDTO } from './dto/update-doctor';

@Resolver(() => Doctor)
export class DoctorResolver {
  constructor(private readonly doctorService: DoctorService) {}

  @Query(() => [Doctor], { name: 'doctors' })
  findAll() {
    return this.doctorService.findAll();
  }

  @Query(() => Doctor, { name: 'doctor' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.doctorService.findOne(id);
  }

  @Mutation(() => Doctor)
  createDoctor(@Args('createDoctorDTO') createDoctorDTO: CreateDoctorDTO) {
    return this.doctorService.create(createDoctorDTO);
  }

  @Mutation(() => Doctor)
  updateDoctor(@Args('updateDoctorDTO') updateDoctorDTO: UpdateDoctorDTO) {
    return this.doctorService.update(updateDoctorDTO.id, updateDoctorDTO);
  }

  @Mutation(() => Doctor)
  removeDoctor(@Args('id', { type: () => Int }) id: number) {
    return this.doctorService.remove(id);
  }
}
