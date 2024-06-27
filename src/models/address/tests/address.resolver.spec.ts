import { Test, TestingModule } from '@nestjs/testing';
import { FindOneParamsGraphQL } from '../../../dto/FindOneParamsGraphQL';
import { AddressResolver } from '../address.resolver';
import { AddressService } from '../address.service';

describe('AddressResolver', () => {
  let resolver: AddressResolver;
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
      providers: [
        AddressResolver,
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

    resolver = module.get<AddressResolver>(AddressResolver);
    service = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a address', async () => {
    jest
      .spyOn(service, 'create')
      .mockImplementation(async () => addressResponse);

    expect(await resolver.createAddress(addressDTO)).toBe(addressResponse);
  });

  it('should find all addresss', async () => {
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(async () => addressesResponse);

    expect(await resolver.findAll()).toBe(addressesResponse);
  });

  it('should find a address by ID', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockImplementation(async () => addressResponse);
    const params: FindOneParamsGraphQL = { id: 1 };
    expect(await resolver.findOne(params)).toBe(addressResponse);
  });

  it('should update a address', async () => {
    jest
      .spyOn(service, 'update')
      .mockImplementation(async () => addressResponse);

    expect(await resolver.updateAddress({ id: 1, ...addressDTO })).toBe(
      addressResponse,
    );
  });

  it('should remove a address', async () => {
    jest
      .spyOn(service, 'remove')
      .mockImplementation(async () => addressDeleted);
    const params: FindOneParamsGraphQL = { id: 1 };
    expect(await resolver.removeAddress(params)).toBe(addressDeleted);
  });
});
