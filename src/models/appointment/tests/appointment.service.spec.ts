import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../modules/prisma/prisma.service';
import { Appointment } from '../appointment.model';
import { AppointmentService } from '../appointment.service';
import { CreateAppointmentDTO } from '../dto/create-appointment';

describe('AppointmentService', () => {
  let appointmentService: AppointmentService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentService, PrismaService],
    }).compile();

    appointmentService = module.get<AppointmentService>(AppointmentService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  const appointmentDTO: CreateAppointmentDTO = {
    date: '26/10/2010',
    doctorId: 1,
    patientsId: [1, 2],
  };

  const appointmentResponse: Appointment = {
    id: 1,
    date: appointmentDTO.date,
    doctorId: appointmentDTO.doctorId,
    patients: appointmentDTO.patientsId.map((id) => ({
      id: id,
      patient: { id, name: `Paciente ${id}`, age: 30 },
      appointment: {
        id: 1,
        date: appointmentDTO.date,
        doctorId: 1,
        doctor: null,
      },
    })),
    doctor: { id: 1, name: 'Dr. João Silva', specialty: 'Cardiologista' },
  };

  const appointmentsResponse = [appointmentResponse];

  const appointmentDeleted: Appointment = {
    id: 1,
    date: appointmentDTO.date,
    doctorId: appointmentDTO.doctorId,
    doctor: { id: 1, name: 'Dr. João Silva', specialty: 'Cardiologista' },
  };

  const patientResponse = {
    id: 1,
    name: 'Paciente 1',
    age: 30,
    appointments: [appointmentResponse],
  };

  describe('findAll', () => {
    it('should return all appointments with doctors and patients', async () => {
      jest
        .spyOn(prismaService.appointment, 'findMany')
        .mockResolvedValue(appointmentsResponse);

      const result = await appointmentService.findAll();
      expect(result).toEqual(appointmentsResponse);
    });
  });

  describe('findOne', () => {
    it('should return the appointment with the given id', async () => {
      jest
        .spyOn(prismaService.appointment, 'findUnique')
        .mockResolvedValue(appointmentResponse);

      const result = await appointmentService.findOne(1);
      expect(result).toEqual(appointmentResponse);
    });

    it('should throw NotFoundException if appointment not found', async () => {
      jest
        .spyOn(prismaService.appointment, 'findUnique')
        .mockResolvedValue(null);

      await expect(appointmentService.findOne(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a new appointment', async () => {
      jest
        .spyOn(prismaService.doctor, 'findUnique')
        .mockResolvedValue(appointmentResponse.doctor);
      jest
        .spyOn(prismaService.patient, 'findUnique')
        .mockResolvedValue(patientResponse);
      jest
        .spyOn(prismaService.appointment, 'create')
        .mockResolvedValue(appointmentResponse);

      const result = await appointmentService.create(appointmentDTO);
      expect(result).toEqual(appointmentResponse);
    });

    it('should throw NotFoundException if doctor not found', async () => {
      jest.spyOn(prismaService.doctor, 'findUnique').mockResolvedValue(null);

      await expect(appointmentService.create(appointmentDTO)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if any patient not found', async () => {
      jest
        .spyOn(prismaService.doctor, 'findUnique')
        .mockResolvedValue(appointmentResponse.doctor);
      jest
        .spyOn(prismaService.patient, 'findUnique')
        .mockResolvedValueOnce(patientResponse)
        .mockResolvedValueOnce(null);

      await expect(appointmentService.create(appointmentDTO)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update an existing appointment', async () => {
      jest
        .spyOn(prismaService.appointment, 'findUnique')
        .mockResolvedValue(appointmentResponse);
      jest
        .spyOn(prismaService.doctor, 'findUnique')
        .mockResolvedValue(appointmentResponse.doctor);
      jest
        .spyOn(prismaService.patient, 'findUnique')
        .mockResolvedValue(patientResponse);
      jest
        .spyOn(prismaService.appointment, 'update')
        .mockResolvedValue(appointmentResponse);

      const result = await appointmentService.update(1, {
        ...appointmentDTO,
        date: '26/10/2010',
      });
      expect(result).toEqual(appointmentResponse);
    });

    it('should throw NotFoundException if appointment not found', async () => {
      jest
        .spyOn(prismaService.appointment, 'findUnique')
        .mockResolvedValue(null);

      await expect(
        appointmentService.update(1, appointmentDTO),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if doctor not found', async () => {
      jest
        .spyOn(prismaService.appointment, 'findUnique')
        .mockResolvedValue(appointmentResponse);
      jest.spyOn(prismaService.doctor, 'findUnique').mockResolvedValue(null);

      await expect(
        appointmentService.update(1, appointmentDTO),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if any patient not found', async () => {
      jest
        .spyOn(prismaService.appointment, 'findUnique')
        .mockResolvedValue(appointmentResponse);
      jest
        .spyOn(prismaService.doctor, 'findUnique')
        .mockResolvedValue(appointmentResponse.doctor);
      jest
        .spyOn(prismaService.patient, 'findUnique')
        .mockResolvedValueOnce(patientResponse)
        .mockResolvedValueOnce(null);

      await expect(
        appointmentService.update(1, appointmentDTO),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an existing appointment', async () => {
      jest
        .spyOn(prismaService.appointment, 'findUnique')
        .mockResolvedValue(appointmentResponse);
      jest
        .spyOn(prismaService.appointment, 'delete')
        .mockResolvedValue(appointmentDeleted);

      const result = await appointmentService.remove(1);
      expect(result).toEqual(appointmentDeleted);
    });

    it('should throw NotFoundException if appointment not found', async () => {
      jest
        .spyOn(prismaService.appointment, 'findUnique')
        .mockResolvedValue(null);

      await expect(appointmentService.remove(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
