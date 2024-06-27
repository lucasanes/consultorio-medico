import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { CreateAppointmentDTO } from './dto/create-appointment';
import { UpdateAppointmentDTO } from './dto/update-appointment';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.appointment.findMany({
      include: { doctor: true, patients: { include: { patient: true } } },
    });
  }

  async findOne(id: number) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: { doctor: true, patients: { include: { patient: true } } },
    });

    if (!appointment) {
      throw new NotFoundException(`Consulta não encontrada.`);
    }

    return appointment;
  }

  async create(data: CreateAppointmentDTO) {
    try {
      const doctor = await this.prisma.doctor.findUnique({
        where: { id: data.doctorId },
      });

      if (!doctor) {
        throw new NotFoundException(
          `Médico com ID ${data.doctorId} não encontrado.`,
        );
      }

      data.patientsId.forEach(async (patientId) => {
        const patient = await this.prisma.patient.findUnique({
          where: { id: patientId },
        });

        if (!patient) {
          throw new NotFoundException(
            `Paciente com ID ${patientId} não encontrado.`,
          );
        }
      });

      return this.prisma.appointment.create({
        data: {
          date: data.date,
          doctorId: data.doctorId,
          patients: {
            createMany: {
              data: data.patientsId.map((patientId) => ({
                patientId,
              })),
            },
          },
        },
        include: { doctor: true, patients: { include: { patient: true } } },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: number, data: UpdateAppointmentDTO) {
    await this.findOne(id);

    const doctor = await this.prisma.doctor.findUnique({
      where: { id: data.doctorId },
    });

    if (!doctor) {
      throw new NotFoundException(
        `Médico com ID ${data.doctorId} não encontrado.`,
      );
    }

    data.patientsId.forEach(async (patientId) => {
      const patient = await this.prisma.patient.findUnique({
        where: { id: patientId },
      });

      if (!patient) {
        throw new NotFoundException(
          `Paciente com ID ${patientId} não encontrado.`,
        );
      }
    });

    return this.prisma.appointment.update({
      where: { id },
      data: {
        date: data.date,
        doctorId: data.doctorId,
        patients: {
          createMany: {
            data: data.patientsId.map((patientId) => ({
              patientId,
            })),
          },
        },
      },
      include: { doctor: true, patients: { include: { patient: true } } },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.appointment.delete({
      where: { id },
    });
  }
}
