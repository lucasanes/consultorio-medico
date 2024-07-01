import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { CreatePatientDTO } from './dto/create-patient';
import { UpdatePatientDTO } from './dto/update-patient';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.patient.findMany({
      include: {
        appointments: {
          select: {
            appointment: true,
          },
          orderBy: {
            appointment: {
              date: 'asc',
            },
          },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      include: {
        appointments: {
          select: {
            appointment: true,
          },
        },
      },
    });

    if (!patient) {
      throw new NotFoundException(`Paciente não encontrado.`);
    }

    return patient;
  }

  async create(data: CreatePatientDTO) {
    return this.prisma.patient.create({
      data: { ...data },
    });
  }

  async update(id: number, data: UpdatePatientDTO) {
    await this.findOne(id);

    return this.prisma.patient.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.patient.delete({
      where: { id },
    });
  }
}
