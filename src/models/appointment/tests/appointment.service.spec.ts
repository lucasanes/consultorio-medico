import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../modules/prisma/prisma.service';
import { AppointmentService } from '../appointment.service';

describe('AppointmentService', () => {
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
      providers: [AppointmentService, PrismaService],
    }).compile();

    service = module.get<AppointmentService>(AppointmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a appointment', async () => {
    jest
      .spyOn(service, 'create')
      .mockImplementation(async () => appointmentResponse);

    expect(await service.create(appointmentDTO)).toEqual(appointmentResponse);
  });

  it('should return all appointments', async () => {
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(async () => appointmentesResponse);

    expect(await service.findAll()).toBe(appointmentesResponse);
  });

  it('should return a appointment by ID', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockImplementation(async () => appointmentResponse);

    expect(await service.findOne(1)).toBe(appointmentResponse);
  });

  it('should update a appointment', async () => {
    jest
      .spyOn(service, 'update')
      .mockImplementation(async () => appointmentResponse);

    expect(await service.update(1, { ...appointmentDTO })).toBe(
      appointmentResponse,
    );
  });

  it('should remove a appointment', async () => {
    jest
      .spyOn(service, 'remove')
      .mockImplementation(async () => appointmentDeleted);

    expect(await service.remove(1)).toBe(appointmentDeleted);
  });
});
