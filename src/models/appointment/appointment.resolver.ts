import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Appointment } from './appointment.model';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDTO } from './dto/create-appointment';
import { UpdateAppointmentDTO } from './dto/update-appointment';

@Resolver(() => Appointment)
export class AppointmentResolver {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Query(() => [Appointment], { name: 'appointments' })
  findAll() {
    return this.appointmentService.findAll();
  }

  @Query(() => Appointment, { name: 'appointment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.appointmentService.findOne(id);
  }

  @Mutation(() => Appointment)
  createAppointment(
    @Args('createAppointmentDTO') createAppointmentDTO: CreateAppointmentDTO,
  ) {
    return this.appointmentService.create(createAppointmentDTO);
  }

  @Mutation(() => Appointment)
  updateAppointment(
    @Args('updateAppointmentDTO') updateAppointmentDTO: UpdateAppointmentDTO,
  ) {
    return this.appointmentService.update(
      updateAppointmentDTO.id,
      updateAppointmentDTO,
    );
  }

  @Mutation(() => Appointment)
  removeAppointment(@Args('id', { type: () => Int }) id: number) {
    return this.appointmentService.remove(id);
  }
}
