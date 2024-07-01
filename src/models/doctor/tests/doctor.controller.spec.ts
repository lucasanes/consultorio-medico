import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { FindOneParams } from 'src/dto/FindOneParams';
import { AuthService } from '../../../models/auth/auth.service';
import { PrismaService } from '../../../modules/prisma/prisma.service';
import { DoctorController } from '../doctor.controller';
import { Doctor } from '../doctor.model';
import { DoctorService } from '../doctor.service';
import { CreateDoctorDTO } from '../dto/create-doctor';

describe('DoctorController', () => {
  let controller: DoctorController;

  let authService: AuthService;
  let service: DoctorService;

  const doctorDTO: CreateDoctorDTO = {
    name: 'Dr. João Silva',
    specialty: 'Cardiologista',
    addressId: 1,
  };

  const doctorResponse: Doctor = {
    id: 1,
    name: 'Dr. João Silva',
    specialty: 'Cardiologista',
    Address: {
      id: 1,
      street: 'Rua A',
      complement: '123',
      neighborhood: 'Mocca',
      city: 'São Paulo',
      state: 'SP',
      doctorId: 1,
      doctor: {
        id: 1,
        name: 'Dr. João Silva',
        specialty: 'Cardiologista',
      },
    },
    appointments: [],
  };

  const doctorsResponse: Doctor[] = [doctorResponse];

  const doctorDeleted = {
    id: 1,
    name: 'Dr. João Silva',
    specialty: 'Cardiologista',
    addressId: 1,
  };

  afterEach(() => {
    authService.disconnect();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorController],
      providers: [
        AuthService,
        PrismaService,
        ConfigService,
        {
          provide: DoctorService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DoctorController>(DoctorController);
    authService = module.get<AuthService>(AuthService);
    service = module.get<DoctorService>(DoctorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a doctor', async () => {
    jest
      .spyOn(service, 'create')
      .mockImplementation(async () => doctorResponse);

    expect(await controller.create(doctorDTO)).toBe(doctorResponse);
  });

  it('should find all doctors', async () => {
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(async () => doctorsResponse);

    expect(await controller.findAll()).toBe(doctorsResponse);
  });

  it('should find a doctor by ID', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockImplementation(async () => doctorResponse);

    const params: FindOneParams = { id: 1 };
    expect(await controller.findOne(params)).toBe(doctorResponse);
  });

  it('should update a doctor', async () => {
    jest
      .spyOn(service, 'update')
      .mockImplementation(async () => doctorResponse);

    const params: FindOneParams = { id: 1 };
    expect(await controller.update(params, { ...doctorDTO })).toBe(
      doctorResponse,
    );
  });

  it('should remove a doctor', async () => {
    jest.spyOn(service, 'remove').mockImplementation(async () => doctorDeleted);
    const params: FindOneParams = { id: 1 };
    expect(await controller.remove(params)).toBe(doctorDeleted);
  });
});
