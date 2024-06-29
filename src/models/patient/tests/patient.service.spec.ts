import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../models/auth/auth.service';
import { PrismaService } from '../../../modules/prisma/prisma.service';
import { PatientService } from '../patient.service';

describe('PatientService', () => {
  let service: PatientService;

  const patientDTO = {
    name: 'Maria',
    age: 1,
  };

  const patientResponse = {
    id: 1,
    name: 'Maria',
    age: 1,
    appointments: [],
  };

  const patientesResponse = [
    {
      id: 1,
      name: 'Maria',
      age: 1,
      appointments: [],
    },
  ];

  const patientDeleted = {
    id: 1,
    name: 'Maria',
    age: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientService, PrismaService, AuthService, ConfigService],
    }).compile();

    service = module.get<PatientService>(PatientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a patient', async () => {
    jest
      .spyOn(service, 'create')
      .mockImplementation(async () => patientResponse);

    expect(await service.create(patientDTO)).toEqual(patientResponse);
  });

  it('should return all patients', async () => {
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(async () => patientesResponse);

    expect(await service.findAll()).toBe(patientesResponse);
  });

  it('should return a patient by ID', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockImplementation(async () => patientResponse);

    expect(await service.findOne(1)).toBe(patientResponse);
  });

  it('should update a patient', async () => {
    jest
      .spyOn(service, 'update')
      .mockImplementation(async () => patientResponse);

    expect(await service.update(1, { ...patientDTO })).toBe(patientResponse);
  });

  it('should remove a patient', async () => {
    jest
      .spyOn(service, 'remove')
      .mockImplementation(async () => patientDeleted);

    expect(await service.remove(1)).toBe(patientDeleted);
  });
});
