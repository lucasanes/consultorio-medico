import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { CreateAddressDTO } from './dto/create-address';
import { UpdateAddressDTO } from './dto/update-address';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.address.findMany({
      include: { doctor: true },
    });
  }

  async findOne(id: number) {
    const address = await this.prisma.address.findUnique({
      where: { id },
      include: { doctor: true },
    });

    if (!address) {
      throw new NotFoundException(`Endereço não encontrado.`);
    }

    return address;
  }

  async create(data: CreateAddressDTO) {
    try {
      const doctor = await this.prisma.doctor.findUnique({
        where: { id: data.doctorId },
        include: { Address: true },
      });

      if (!doctor) {
        throw new NotFoundException(
          `Médico com ID ${data.doctorId} não encontrado.`,
        );
      }

      if (doctor.Address) {
        throw new BadRequestException(
          `Médico com ID ${data.doctorId} já possui um endereço.`,
        );
      }

      return this.prisma.address.create({
        data: { ...data },
        include: { doctor: true },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: number, data: UpdateAddressDTO) {
    await this.findOne(id);

    const doctor = await this.prisma.doctor.findUnique({
      where: { id: data.doctorId },
    });

    if (!doctor) {
      throw new NotFoundException(
        `Médico com ID ${data.doctorId} não encontrado.`,
      );
    }

    return this.prisma.address.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.address.delete({
      where: { id },
    });
  }
}
