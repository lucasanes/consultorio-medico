import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './../../modules/prisma/prisma.service';
import { Doctor } from './doctor.model';
import { CreateDoctorDTO } from './dto/create-doctor';
import { UpdateDoctorDTO } from './dto/update-doctor';

@Injectable()
export class DoctorService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Doctor[]> {
    return this.prisma.doctor.findMany({
      include: { appointments: true, Address: true },
    });
  }

  async findOne(id: number): Promise<Doctor> {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id },
      include: { appointments: true, Address: true },
    });

    if (!doctor) {
      throw new NotFoundException(`Médico não encontrado.`);
    }

    return doctor;
  }

  async create(data: CreateDoctorDTO): Promise<Doctor> {
    if (data.addressId) {
      const address = await this.prisma.address.findUnique({
        where: { id: data.addressId },
      });

      if (!address) {
        throw new NotFoundException(
          `Endereço com ID ${data.addressId} não encontrado.`,
        );
      }

      if (address.doctorId) {
        throw new NotFoundException(
          `Endereço com ID ${data.addressId} já está associado a um médico.`,
        );
      }
    }

    if (data.addressId == 0) {
      throw new NotFoundException(`Endereço com ID 0 não é válido.`);
    }

    return this.prisma.doctor.create({
      data: {
        ...data,
      },
    });
  }

  async update(id: number, data: UpdateDoctorDTO): Promise<Doctor> {
    await this.findOne(id);

    if (data.addressId) {
      const address = await this.prisma.address.findUnique({
        where: { id: data.addressId },
      });

      if (!address) {
        throw new NotFoundException(
          `Endereço com ID ${data.addressId} não encontrado.`,
        );
      }

      if (address.doctorId) {
        throw new NotFoundException(
          `Endereço com ID ${data.addressId} já está associado a um médico.`,
        );
      }
    }

    if (data.addressId == 0) {
      throw new NotFoundException(`Endereço com ID 0 não é válido.`);
    }

    return this.prisma.doctor.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async remove(id: number): Promise<Doctor> {
    await this.findOne(id);

    return this.prisma.doctor.delete({
      where: { id },
    });
  }
}
