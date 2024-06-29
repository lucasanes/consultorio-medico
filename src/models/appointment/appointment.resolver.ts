import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminGuard } from '../../common/guards/admin.guard';
import { AuthGuard } from '../../common/guards/auth.guard';
import { FindOneParamsGraphQL } from '../../dto/FindOneParamsGraphQL';
import { Appointment } from './appointment.model';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDTO } from './dto/create-appointment';
import { UpdateAppointmentIdDTO } from './dto/update-appointment-id';

@Resolver(() => Appointment)
export class AppointmentResolver {
  constructor(private readonly appointmentService: AppointmentService) {}

  @UseGuards(AuthGuard)
  @Query(() => [Appointment], { name: 'appointments' })
  findAll() {
    return this.appointmentService.findAll();
  }

  @UseGuards(AuthGuard)
  @Query(() => Appointment, { name: 'appointment' })
  findOne(@Args('params') params: FindOneParamsGraphQL) {
    return this.appointmentService.findOne(+params.id);
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Appointment)
  createAppointment(
    @Args('createAppointmentDTO')
    createAppointmentDTO: CreateAppointmentDTO,
  ) {
    return this.appointmentService.create(createAppointmentDTO);
  }

  @UseGuards(AdminGuard)
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

  @UseGuards(AdminGuard)
  @Mutation(() => Appointment)
  removeAppointment(@Args('params') params: FindOneParamsGraphQL) {
    return this.appointmentService.remove(+params.id);
  }
}
