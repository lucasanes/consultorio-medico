import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { FindOneParamsGraphQL } from '../../../dto/FindOneParamsGraphQL';
import { AuthService } from '../../../models/auth/auth.service';
import { PatientResolver } from '../patient.resolver';
import { PatientService } from '../patient.service';

describe('PatientResolver', () => {
  let resolver: PatientResolver;
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
      providers: [
        PatientResolver,
        AuthService,
        ConfigService,
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

    resolver = module.get<PatientResolver>(PatientResolver);
    service = module.get<PatientService>(PatientService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a patient', async () => {
    jest
      .spyOn(service, 'create')
      .mockImplementation(async () => patientResponse);

    expect(await resolver.createPatient(patientDTO)).toBe(patientResponse);
  });

  it('should find all patients', async () => {
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(async () => patientesResponse);

    expect(await resolver.findAll()).toBe(patientesResponse);
  });

  it('should find a patient by ID', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockImplementation(async () => patientResponse);
    const params: FindOneParamsGraphQL = { id: 1 };
    expect(await resolver.findOne(params)).toBe(patientResponse);
  });

  it('should update a patient', async () => {
    jest
      .spyOn(service, 'update')
      .mockImplementation(async () => patientResponse);

    expect(await resolver.updatePatient({ id: 1, ...patientDTO })).toBe(
      patientResponse,
    );
  });

  it('should remove a patient', async () => {
    jest
      .spyOn(service, 'remove')
      .mockImplementation(async () => patientDeleted);
    const params: FindOneParamsGraphQL = { id: 1 };
    expect(await resolver.removePatient(params)).toBe(patientDeleted);
  });
});
