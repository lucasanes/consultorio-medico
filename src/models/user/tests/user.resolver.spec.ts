import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@prisma/client';
import { FindOneParamsGraphQL } from '../../../dto/FindOneParamsGraphQL';
import { AuthService } from '../../../models/auth/auth.service';
import { UserResolver } from '../user.resolver';
import { UserService } from '../user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let service: UserService;

  const userDTO = {
    name: 'João Silva',
    email: 'eu@gmail.com',
    password: '123456',
    role: Role.ADMIN,
    isValidated: false,
  };

  const userResponse = {
    id: 1,
    name: 'João Silva',
    email: 'eu@gmail.com',
    password: '123456',
    role: Role.ADMIN,
    isValidated: false,
  };

  const usersResponse = [
    {
      id: 1,
      name: 'João Silva',
      email: 'eu@gmail.com',
      password: '123456',
      role: Role.ADMIN,
      isValidated: false,
    },
  ];

  const userDeleted = {
    id: 1,
    name: 'João Silva',
    email: 'eu@gmail.com',
    password: '123456',
    role: Role.ADMIN,
    isValidated: false,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        AuthService,
        ConfigService,
        {
          provide: UserService,
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

    resolver = module.get<UserResolver>(UserResolver);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a user', async () => {
    jest.spyOn(service, 'create').mockImplementation(async () => userResponse);

    expect(await resolver.createUser(userDTO)).toBe(userResponse);
  });

  it('should find all users', async () => {
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(async () => usersResponse);

    expect(await resolver.findAll()).toBe(usersResponse);
  });

  it('should find a user by ID', async () => {
    jest.spyOn(service, 'findOne').mockImplementation(async () => userResponse);
    const params: FindOneParamsGraphQL = { id: 1 };
    expect(await resolver.findOne(params)).toBe(userResponse);
  });

  it('should update a user', async () => {
    jest.spyOn(service, 'update').mockImplementation(async () => userResponse);

    expect(await resolver.updateUser({ id: 1, ...userDTO })).toBe(userResponse);
  });

  it('should remove a user', async () => {
    jest.spyOn(service, 'remove').mockImplementation(async () => userDeleted);
    const params: FindOneParamsGraphQL = { id: 1 };
    expect(await resolver.removeUser(params)).toBe(userDeleted);
  });
});
