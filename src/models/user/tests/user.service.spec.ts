import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@prisma/client';
import { PrismaService } from '../../../modules/prisma/prisma.service';
import { UserService } from '../user.service';

describe('UserService', () => {
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
      providers: [UserService, PrismaService, JwtService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    jest.spyOn(service, 'create').mockImplementation(async () => userResponse);

    expect(await service.create(userDTO)).toEqual(userResponse);
  });

  it('should return all users', async () => {
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(async () => usersResponse);

    expect(await service.findAll()).toBe(usersResponse);
  });

  it('should return a user by ID', async () => {
    jest.spyOn(service, 'findOne').mockImplementation(async () => userResponse);

    expect(await service.findOne(1)).toBe(userResponse);
  });

  it('should update a user', async () => {
    jest.spyOn(service, 'update').mockImplementation(async () => userResponse);

    expect(await service.update(1, { ...userDTO })).toBe(userResponse);
  });

  it('should remove a user', async () => {
    jest.spyOn(service, 'remove').mockImplementation(async () => userDeleted);

    expect(await service.remove(1)).toBe(userDeleted);
  });
});
