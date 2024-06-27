import { Test, TestingModule } from '@nestjs/testing';
import { FindOneParams } from 'src/dto/FindOneParams';
import { PatientController } from '../patient.controller';
import { PatientService } from '../patient.service';

describe('PatientController', () => {
  let controller: PatientController;
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
      controllers: [PatientController],
      providers: [
        {
          provide: PatientService,
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

    controller = module.get<PatientController>(PatientController);
    service = module.get<PatientService>(PatientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a patient', async () => {
    jest
      .spyOn(service, 'create')
      .mockImplementation(async () => patientResponse);

    expect(await controller.create(patientDTO)).toBe(patientResponse);
  });

  it('should find all patients', async () => {
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(async () => patientesResponse);

    expect(await controller.findAll()).toBe(patientesResponse);
  });

  it('should find a patient by ID', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockImplementation(async () => patientResponse);

    const params: FindOneParams = { id: 1 };
    expect(await controller.findOne(params)).toBe(patientResponse);
  });

  it('should update a patient', async () => {
    jest
      .spyOn(service, 'update')
      .mockImplementation(async () => patientResponse);

    const params: FindOneParams = { id: 1 };
    expect(await controller.update(params, { id: 1, ...patientDTO })).toBe(
      patientResponse,
    );
  });

  it('should remove a patient', async () => {
    jest
      .spyOn(service, 'remove')
      .mockImplementation(async () => patientDeleted);
    const params: FindOneParams = { id: 1 };
    expect(await controller.remove(params)).toBe(patientDeleted);
  });
});
