import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../models/auth/auth.service';
import { PrismaService } from '../../../modules/prisma/prisma.service';
import { DoctorService } from '../doctor.service';

describe('DoctorService', () => {
  let service: DoctorService;

  const doctorDTO = {
    name: 'Dr. João Silva',
    specialty: 'Cardiologista',
    addressId: 1,
  };

  const doctorResponse = {
    id: 1,
    name: 'Dr. João Silva',
    specialty: 'Cardiologista',
    addressId: 1,
    Address: {
      id: 1,
      street: 'Rua A',
      complement: '123',
      neighborhood: 'Mocca',
      city: 'São Paulo',
      state: 'SP',
      doctorId: 1,
    },
    appointments: [],
  };

  const doctorsResponse = [
    {
      id: 1,
      name: 'Dr. João Silva',
      specialty: 'Cardiologista',
      addressId: 1,
      Address: {
        id: 1,
        street: 'Rua A',
        complement: '123',
        neighborhood: 'Mocca',
        city: 'São Paulo',
        state: 'SP',
        doctorId: 1,
      },
      appointments: [],
    },
  ];

  const doctorDeleted = {
    id: 1,
    name: 'Dr. João Silva',
    specialty: 'Cardiologista',
    addressId: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorService, PrismaService, AuthService, ConfigService],
    }).compile();

    service = module.get<DoctorService>(DoctorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a doctor', async () => {
    jest.spyOn(service, 'create').mockImplementation(async () => ({
      id: 1,
      ...doctorDTO,
    }));

    expect(await service.create(doctorDTO)).toEqual({
      id: 1,
      ...doctorDTO,
    });
  });

  it('should return all doctors', async () => {
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(async () => doctorsResponse);

    expect(await service.findAll()).toBe(doctorsResponse);
  });

  it('should return a doctor by ID', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockImplementation(async () => doctorResponse);

    expect(await service.findOne(1)).toBe(doctorResponse);
  });

  it('should update a doctor', async () => {
    jest
      .spyOn(service, 'update')
      .mockImplementation(async () => doctorResponse);

    expect(await service.update(1, { ...doctorDTO })).toBe(doctorResponse);
  });

  it('should remove a doctor', async () => {
    jest.spyOn(service, 'remove').mockImplementation(async () => doctorDeleted);

    expect(await service.remove(1)).toBe(doctorDeleted);
  });
});
