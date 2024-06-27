import { Test, TestingModule } from '@nestjs/testing';
import { FindOneParams } from 'src/dto/FindOneParams';
import { AddressController } from '../address.controller';
import { AddressService } from '../address.service';

describe('AddressController', () => {
  let controller: AddressController;
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
      controllers: [AddressController],
      providers: [
        {
          provide: AddressService,
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

    controller = module.get<AddressController>(AddressController);
    service = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a address', async () => {
    jest
      .spyOn(service, 'create')
      .mockImplementation(async () => addressResponse);

    expect(await controller.create(addressDTO)).toBe(addressResponse);
  });

  it('should find all addresss', async () => {
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(async () => addressesResponse);

    expect(await controller.findAll()).toBe(addressesResponse);
  });

  it('should find a address by ID', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockImplementation(async () => addressResponse);

    const params: FindOneParams = { id: 1 };
    expect(await controller.findOne(params)).toBe(addressResponse);
  });

  it('should update a address', async () => {
    jest
      .spyOn(service, 'update')
      .mockImplementation(async () => addressResponse);

    const params: FindOneParams = { id: 1 };
    expect(await controller.update(params, { id: 1, ...addressDTO })).toBe(
      addressResponse,
    );
  });

  it('should remove a address', async () => {
    jest
      .spyOn(service, 'remove')
      .mockImplementation(async () => addressDeleted);
    const params: FindOneParams = { id: 1 };
    expect(await controller.remove(params)).toBe(addressDeleted);
  });
});
