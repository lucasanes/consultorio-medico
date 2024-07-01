import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../modules/prisma/prisma.service';
import { CreatePatientDTO } from '../dto/create-patient';
import { UpdatePatientDTO } from '../dto/update-patient';
import { PatientService } from '../patient.service';

describe('PatientService', () => {
  let patientService: PatientService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientService, PrismaService],
    }).compile();

    patientService = module.get<PatientService>(PatientService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  const patientDTO: CreatePatientDTO = {
    name: 'João da Silva',
    age: 30,
  };

  const patientResponse = {
    id: 1,
    name: 'João da Silva',
    age: 30,
  };

  describe('create', () => {
    it('should create a patient', async () => {
      jest
        .spyOn(prismaService.patient, 'create')
        .mockResolvedValue(patientResponse);

      const result = await patientService.create(patientDTO);
      expect(result).toEqual(patientResponse);
    });
  });

  describe('update', () => {
    it('should throw NotFoundException if patient not found', async () => {
      jest.spyOn(prismaService.patient, 'findUnique').mockResolvedValue(null);

      await expect(
        patientService.update(1, {} as UpdatePatientDTO),
      ).rejects.toThrow(NotFoundException);
    });

    it('should update a patient', async () => {
      jest
        .spyOn(prismaService.patient, 'findUnique')
        .mockResolvedValue(patientResponse);
      jest
        .spyOn(prismaService.patient, 'update')
        .mockResolvedValue(patientResponse);

      const result = await patientService.update(1, {} as UpdatePatientDTO);
      expect(result).toEqual(patientResponse);
    });
  });

  describe('remove', () => {
    it('should throw NotFoundException if patient not found', async () => {
      jest.spyOn(prismaService.patient, 'findUnique').mockResolvedValue(null);

      await expect(patientService.remove(1)).rejects.toThrow(NotFoundException);
    });

    it('should remove a patient', async () => {
      jest
        .spyOn(prismaService.patient, 'findUnique')
        .mockResolvedValue(patientResponse);
      jest
        .spyOn(prismaService.patient, 'delete')
        .mockResolvedValue(patientResponse);

      const result = await patientService.remove(1);
      expect(result).toEqual(patientResponse);
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if patient not found', async () => {
      jest.spyOn(prismaService.patient, 'findUnique').mockResolvedValue(null);

      await expect(patientService.findOne(1)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should find one patient', async () => {
      jest
        .spyOn(prismaService.patient, 'findUnique')
        .mockResolvedValue(patientResponse);

      const result = await patientService.findOne(1);
      expect(result).toEqual(patientResponse);
    });
  });

  describe('findAll', () => {
    it('should find all patients', async () => {
      const patientsList = [patientResponse];
      jest
        .spyOn(prismaService.patient, 'findMany')
        .mockResolvedValue(patientsList);

      const result = await patientService.findAll();
      expect(result).toEqual(patientsList);
    });
  });
});
