import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@prisma/client';
import { FindOneParams } from '../../../dto/FindOneParams';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

describe('UserController', () => {
  let controller: UserController;
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
      controllers: [UserController],
      providers: [
        JwtService,
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

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    jest.spyOn(service, 'create').mockImplementation(async () => userResponse);

    expect(await controller.create(userDTO)).toBe(userResponse);
  });

  it('should find all users', async () => {
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(async () => usersResponse);

    expect(await controller.findAll()).toBe(usersResponse);
  });

  it('should find a user by ID', async () => {
    jest.spyOn(service, 'findOne').mockImplementation(async () => userResponse);

    const params: FindOneParams = { id: 1 };
    expect(await controller.findOne(params)).toBe(userResponse);
  });

  it('should update a user', async () => {
    jest.spyOn(service, 'update').mockImplementation(async () => userResponse);

    const params: FindOneParams = { id: 1 };
    expect(await controller.update(params, { ...userDTO })).toBe(userResponse);
  });

  it('should remove a user', async () => {
    jest.spyOn(service, 'remove').mockImplementation(async () => userDeleted);
    const params: FindOneParams = { id: 1 };
    expect(await controller.remove(params)).toBe(userDeleted);
  });
});
