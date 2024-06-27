import { Test, TestingModule } from '@nestjs/testing';
import { FindOneParamsGraphQL } from '../../../dto/FindOneParamsGraphQL';
import { AppointmentResolver } from '../appointment.resolver';
import { AppointmentService } from '../appointment.service';

describe('AppointmentResolver', () => {
  let resolver: AppointmentResolver;
  let service: AppointmentService;

  const appointmentDTO = {
    date: '20/12/2024',
    doctorId: 1,
    patientsId: [1, 2, 3],
  };

  const appointmentResponse = {
    id: 1,
    date: '20/12/2024',
    doctorId: 1,
    doctor: {
      id: 1,
      name: 'Dr. João Silva',
      specialty: 'Cardiologista',
      appointmentId: 1,
    },
    patients: [
      {
        id: 1,
        patientId: 1,
        appointmentId: 1,
        patient: {
          id: 1,
          name: 'Maria',
          age: 18,
          appointments: [],
        },
      },
    ],
  };

  const appointmentesResponse = [
    {
      id: 1,
      date: '20/12/2024',
      doctorId: 1,
      doctor: {
        id: 1,
        name: 'Dr. João Silva',
        specialty: 'Cardiologista',
        appointmentId: 1,
      },
      patients: [
        {
          id: 1,
          patientId: 1,
          appointmentId: 1,
          patient: {
            id: 1,
            name: 'Maria',
            age: 18,
            appointments: [],
          },
        },
      ],
    },
  ];

  const appointmentDeleted = {
    id: 1,
    date: '20/12/2024',
    doctorId: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentResolver,
        {
          provide: AppointmentService,
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

    resolver = module.get<AppointmentResolver>(AppointmentResolver);
    service = module.get<AppointmentService>(AppointmentService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a appointment', async () => {
    jest
      .spyOn(service, 'create')
      .mockImplementation(async () => appointmentResponse);

    expect(await resolver.createAppointment(appointmentDTO)).toBe(
      appointmentResponse,
    );
  });

  it('should find all appointments', async () => {
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(async () => appointmentesResponse);

    expect(await resolver.findAll()).toBe(appointmentesResponse);
  });

  it('should find a appointment by ID', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockImplementation(async () => appointmentResponse);
    const params: FindOneParamsGraphQL = { id: 1 };
    expect(await resolver.findOne(params)).toBe(appointmentResponse);
  });

  it('should update a appointment', async () => {
    jest
      .spyOn(service, 'update')
      .mockImplementation(async () => appointmentResponse);

    expect(await resolver.updateAppointment({ id: 1, ...appointmentDTO })).toBe(
      appointmentResponse,
    );
  });

  it('should remove a appointment', async () => {
    jest
      .spyOn(service, 'remove')
      .mockImplementation(async () => appointmentDeleted);
    const params: FindOneParamsGraphQL = { id: 1 };
    expect(await resolver.removeAppointment(params)).toBe(appointmentDeleted);
  });
});
