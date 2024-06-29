import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../models/auth/auth.service';
import { PrismaService } from '../../../modules/prisma/prisma.service';
import { AddressService } from '../address.service';

describe('AddressService', () => {
  let service: AddressService;

  const addressDTO = {
    street: 'Rua A',
    complement: '123',
    neighborhood: 'Mocca',
    city: 'São Paulo',
    state: 'SP',
    doctorId: 1,
  };

  const addressResponse = {
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
      addressId: 1,
    },
  };

  const addressesResponse = [
    {
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
        addressId: 1,
      },
    },
  ];

  const addressDeleted = {
    id: 1,
    street: 'Rua A',
    complement: '123',
    neighborhood: 'Mocca',
    city: 'São Paulo',
    state: 'SP',
    doctorId: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressService, PrismaService, JwtService, AuthService],
    }).compile();

    service = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a address', async () => {
    jest
      .spyOn(service, 'create')
      .mockImplementation(async () => addressResponse);

    expect(await service.create(addressDTO)).toEqual(addressResponse);
  });

  it('should return all addresss', async () => {
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(async () => addressesResponse);

    expect(await service.findAll()).toBe(addressesResponse);
  });

  it('should return a address by ID', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockImplementation(async () => addressResponse);

    expect(await service.findOne(1)).toBe(addressResponse);
  });

  it('should update a address', async () => {
    jest
      .spyOn(service, 'update')
      .mockImplementation(async () => addressResponse);

    expect(await service.update(1, { ...addressDTO })).toBe(addressResponse);
  });

  it('should remove a address', async () => {
    jest
      .spyOn(service, 'remove')
      .mockImplementation(async () => addressDeleted);

    expect(await service.remove(1)).toBe(addressDeleted);
  });
});
