import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FindOneParamsGraphQL } from '../../dto/FindOneParamsGraphQL';
import { Appointment } from './appointment.model';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDTO } from './dto/create-appointment';
import { UpdateAppointmentIdDTO } from './dto/update-appointment-id';

@Resolver(() => Appointment)
export class AppointmentResolver {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Query(() => [Appointment], { name: 'appointments' })
  findAll() {
    return this.appointmentService.findAll();
  }

  @Query(() => Appointment, { name: 'appointment' })
  findOne(@Args('params') params: FindOneParamsGraphQL) {
    return this.appointmentService.findOne(+params.id);
  }

  @Mutation(() => Appointment)
  createAppointment(
    @Args('createAppointmentDTO')
    createAppointmentDTO: CreateAppointmentDTO,
  ) {
    return this.appointmentService.create(createAppointmentDTO);
  }

  @Mutation(() => Appointment)
  updateAppointment(
    @Args('updateAppointmentDTO')
    updateAppointmentDTO: UpdateAppointmentIdDTO,
  ) {
    return this.appointmentService.update(
      updateAppointmentDTO.id,
      updateAppointmentDTO,
    );
  }

  @Mutation(() => Appointment)
  removeAppointment(@Args('params') params: FindOneParamsGraphQL) {
    return this.appointmentService.remove(+params.id);
  }
}
