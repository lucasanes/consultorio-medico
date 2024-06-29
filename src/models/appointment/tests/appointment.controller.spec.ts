import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { FindOneParams } from 'src/dto/FindOneParams';
import { AuthService } from '../../../models/auth/auth.service';
import { AppointmentController } from '../appointment.controller';
import { AppointmentService } from '../appointment.service';

describe('AppointmentController', () => {
  let controller: AppointmentController;
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
      controllers: [AppointmentController],
      providers: [
        JwtService,
        AuthService,
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

    controller = module.get<AppointmentController>(AppointmentController);
    service = module.get<AppointmentService>(AppointmentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a appointment', async () => {
    jest
      .spyOn(service, 'create')
      .mockImplementation(async () => appointmentResponse);

    expect(await controller.create(appointmentDTO)).toBe(appointmentResponse);
  });

  it('should find all appointments', async () => {
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(async () => appointmentesResponse);

    expect(await controller.findAll()).toBe(appointmentesResponse);
  });

  it('should find a appointment by ID', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockImplementation(async () => appointmentResponse);

    const params: FindOneParams = { id: 1 };
    expect(await controller.findOne(params)).toBe(appointmentResponse);
  });

  it('should update a appointment', async () => {
    jest
      .spyOn(service, 'update')
      .mockImplementation(async () => appointmentResponse);

    const params: FindOneParams = { id: 1 };
    expect(await controller.update(params, { ...appointmentDTO })).toBe(
      appointmentResponse,
    );
  });

  it('should remove a appointment', async () => {
    jest
      .spyOn(service, 'remove')
      .mockImplementation(async () => appointmentDeleted);
    const params: FindOneParams = { id: 1 };
    expect(await controller.remove(params)).toBe(appointmentDeleted);
  });
});
