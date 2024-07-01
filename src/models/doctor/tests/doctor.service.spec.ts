import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../modules/prisma/prisma.service';
import { Doctor } from '../doctor.model';
import { DoctorService } from '../doctor.service';
import { CreateDoctorDTO } from '../dto/create-doctor';

describe('DoctorService', () => {
  let doctorService: DoctorService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorService, PrismaService],
    }).compile();

    doctorService = module.get<DoctorService>(DoctorService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  const doctorDTO: CreateDoctorDTO = {
    name: 'Dr. João Silva',
    specialty: 'Cardiologista',
    addressId: 1,
  };

  const doctorResponse: Doctor = {
    id: 1,
    name: 'Dr. João Silva',
    specialty: 'Cardiologista',
  };

  const addressResponse = {
    id: 1,
    street: 'Rua A',
    complement: '123',
    neighborhood: 'Mocca',
    city: 'São Paulo',
    state: 'SP',
    doctorId: null,
  };

  describe('create', () => {
    it('should throw NotFoundException if address not found', async () => {
      jest.spyOn(prismaService.address, 'findUnique').mockResolvedValue(null);

      await expect(doctorService.create(doctorDTO)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if address is already associated with a doctor', async () => {
      jest
        .spyOn(prismaService.address, 'findUnique')
        .mockResolvedValue({ ...addressResponse, doctorId: 1 });

      await expect(doctorService.create(doctorDTO)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if addressId is 0', async () => {
      const invalidDoctorDTO = { ...doctorDTO, addressId: 0 };

      await expect(doctorService.create(invalidDoctorDTO)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should create a doctor', async () => {
      jest.spyOn(prismaService.address, 'findUnique').mockResolvedValue({
        ...addressResponse,
        doctorId: null,
      });
      jest
        .spyOn(prismaService.doctor, 'create')
        .mockResolvedValue(doctorResponse);

      const result = await doctorService.create(doctorDTO);
      expect(result).toEqual(doctorResponse);
    });
  });

  describe('update', () => {
    it('should throw NotFoundException if doctor not found', async () => {
      jest.spyOn(prismaService.doctor, 'findUnique').mockResolvedValue(null);

      await expect(doctorService.update(1, doctorDTO)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if address not found', async () => {
      jest
        .spyOn(prismaService.doctor, 'findUnique')
        .mockResolvedValue(doctorResponse);
      jest.spyOn(prismaService.address, 'findUnique').mockResolvedValue(null);

      await expect(doctorService.update(1, doctorDTO)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if address is already associated with a doctor', async () => {
      jest
        .spyOn(prismaService.address, 'findUnique')
        .mockResolvedValue({ ...addressResponse, doctorId: 2 });

      await expect(doctorService.create(doctorDTO)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if addressId is 0', async () => {
      const invalidDoctorDTO = { ...doctorDTO, addressId: 0 };
      jest
        .spyOn(prismaService.doctor, 'findUnique')
        .mockResolvedValue(doctorResponse);

      await expect(doctorService.update(1, invalidDoctorDTO)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should update a doctor', async () => {
      jest
        .spyOn(prismaService.doctor, 'findUnique')
        .mockResolvedValue(doctorResponse);
      jest.spyOn(prismaService.address, 'findUnique').mockResolvedValue({
        ...addressResponse,
        doctor: null,
      });
      jest
        .spyOn(prismaService.doctor, 'update')
        .mockResolvedValue(doctorResponse);

      const result = await doctorService.update(1, doctorDTO);
      expect(result).toEqual(doctorResponse);
    });
  });

  describe('remove', () => {
    it('should throw NotFoundException if doctor not found', async () => {
      jest.spyOn(prismaService.doctor, 'findUnique').mockResolvedValue(null);

      await expect(doctorService.remove(1)).rejects.toThrow(NotFoundException);
    });

    it('should remove a doctor', async () => {
      jest
        .spyOn(prismaService.doctor, 'findUnique')
        .mockResolvedValue(doctorResponse);
      jest
        .spyOn(prismaService.doctor, 'delete')
        .mockResolvedValue(doctorResponse);

      const result = await doctorService.remove(1);
      expect(result).toEqual(doctorResponse);
    });
  });
});
