import { Test, TestingModule } from '@nestjs/testing';
import { FindOneParamsGraphQL } from '../../../dto/FindOneParamsGraphQL';
import { DoctorResolver } from '../doctor.resolver';
import { DoctorService } from '../doctor.service';

describe('DoctorResolver', () => {
  let resolver: DoctorResolver;
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
      providers: [
        DoctorResolver,
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

    resolver = module.get<DoctorResolver>(DoctorResolver);
    service = module.get<DoctorService>(DoctorService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a doctor', async () => {
    const result = {
      id: 1,
      ...doctorDTO,
    };

    jest.spyOn(service, 'create').mockImplementation(async () => result);

    expect(await resolver.createDoctor(doctorDTO)).toBe(result);
  });

  it('should find all doctors', async () => {
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(async () => doctorsResponse);

    expect(await resolver.findAll()).toBe(doctorsResponse);
  });

  it('should find a doctor by ID', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockImplementation(async () => doctorResponse);
    const params: FindOneParamsGraphQL = { id: 1 };
    expect(await resolver.findOne(params)).toBe(doctorResponse);
  });

  it('should update a doctor', async () => {
    jest
      .spyOn(service, 'update')
      .mockImplementation(async () => doctorResponse);

    expect(await resolver.updateDoctor({ id: 1, ...doctorDTO })).toBe(
      doctorResponse,
    );
  });

  it('should remove a doctor', async () => {
    jest.spyOn(service, 'remove').mockImplementation(async () => doctorDeleted);
    const params: FindOneParamsGraphQL = { id: 1 };
    expect(await resolver.removeDoctor(params)).toBe(doctorDeleted);
  });
});
