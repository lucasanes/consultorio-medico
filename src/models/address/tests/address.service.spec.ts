import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../modules/prisma/prisma.service';
import { AddressService } from '../address.service';
import { CreateAddressDTO } from '../dto/create-address';

describe('AddressService', () => {
  let addressService: AddressService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressService, PrismaService],
    }).compile();

    addressService = module.get<AddressService>(AddressService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  const addressDTO: CreateAddressDTO = {
    street: 'Rua A',
    complement: '123',
    neighborhood: 'Mocca',
    city: 'São Paulo',
    state: 'SP',
    doctorId: 1,
  };

  const addressResponse = {
    id: 1,
    ...addressDTO,
  };

  const addressesResponse = [addressResponse];

  const addressDeleted = {
    id: 1,
    ...addressDTO,
  };

  const doctor = {
    id: 1,
    name: 'Doctor',
    specialty: 'Dentist',
  };

  describe('findAll', () => {
    it('should return all addresses with doctors', async () => {
      jest
        .spyOn(prismaService.address, 'findMany')
        .mockResolvedValue(addressesResponse);

      const result = await addressService.findAll();
      expect(result).toEqual(addressesResponse);
    });
  });

  describe('findOne', () => {
    it('should return the address with the given id', async () => {
      jest
        .spyOn(prismaService.address, 'findUnique')
        .mockResolvedValue(addressResponse);

      const result = await addressService.findOne(1);
      expect(result).toEqual(addressResponse);
    });

    it('should throw NotFoundException if address not found', async () => {
      jest.spyOn(prismaService.address, 'findUnique').mockResolvedValue(null);

      await expect(addressService.findOne(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a new address', async () => {
      jest.spyOn(prismaService.doctor, 'findUnique').mockResolvedValue(doctor);
      jest
        .spyOn(prismaService.address, 'create')
        .mockResolvedValue(addressResponse);

      const result = await addressService.create(addressDTO);
      expect(result).toEqual(addressResponse);
    });

    it('should throw NotFoundException if doctor not found', async () => {
      jest.spyOn(prismaService.doctor, 'findUnique').mockResolvedValue(null);

      await expect(addressService.create(addressDTO)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException if doctor already has an address', async () => {
      jest
        .spyOn(prismaService.doctor, 'findUnique')
        .mockResolvedValue({ ...doctor, Address: addressResponse } as any);

      await expect(addressService.create(addressDTO)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('update', () => {
    it('should update an existing address', async () => {
      jest
        .spyOn(prismaService.address, 'findUnique')
        .mockResolvedValue(addressResponse);
      jest.spyOn(prismaService.doctor, 'findUnique').mockResolvedValue(doctor);
      jest
        .spyOn(prismaService.address, 'update')
        .mockResolvedValue(addressResponse);

      const result = await addressService.update(1, {
        ...addressDTO,
        city: 'Rio de Janeiro',
      });
      expect(result).toEqual(addressResponse);
    });

    it('should throw NotFoundException if address not found', async () => {
      jest.spyOn(prismaService.address, 'findUnique').mockResolvedValue(null);

      await expect(addressService.update(1, addressDTO)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if doctor not found', async () => {
      jest
        .spyOn(prismaService.address, 'findUnique')
        .mockResolvedValue(addressResponse);
      jest.spyOn(prismaService.doctor, 'findUnique').mockResolvedValue(null);

      await expect(addressService.update(1, addressDTO)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should delete an existing address', async () => {
      jest
        .spyOn(prismaService.address, 'findUnique')
        .mockResolvedValue(addressResponse);
      jest
        .spyOn(prismaService.address, 'delete')
        .mockResolvedValue(addressDeleted);

      const result = await addressService.remove(1);
      expect(result).toEqual(addressDeleted);
    });

    it('should throw NotFoundException if address not found', async () => {
      jest.spyOn(prismaService.address, 'findUnique').mockResolvedValue(null);

      await expect(addressService.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
