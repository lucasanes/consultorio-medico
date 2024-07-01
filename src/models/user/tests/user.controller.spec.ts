import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@prisma/client';
import { FindOneParams } from '../../../dto/FindOneParams';
import { AuthService } from '../../../models/auth/auth.service';
import { PrismaService } from '../../../modules/prisma/prisma.service';
import { MsgResponse } from '../msgResponse.model';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

describe('UserController', () => {
  let controller: UserController;

  let authService: AuthService;
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

  const signInResponse: MsgResponse = {
    msg: 'Token',
  };

  const signOutResponse: MsgResponse = {
    msg: 'Desconectado com sucesso.',
  };

  const verifyUserResponse: MsgResponse = {
    msg: 'Verificado com sucesso.',
  };

  const forgotPasswordResponse: MsgResponse = {
    msg: 'Email enviado com sucesso.',
  };

  const changePasswordResponse: MsgResponse = {
    msg: 'Senha alterada com sucesso.',
  };

  afterEach(() => {
    authService.disconnect();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        AuthService,
        PrismaService,
        ConfigService,
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            signIn: jest.fn(),
            signOut: jest.fn(),
            verify: jest.fn(),
            forgotPassword: jest.fn(),
            changePassword: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    authService = module.get<AuthService>(AuthService);
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

  it('should sign in a user', async () => {
    jest
      .spyOn(service, 'signIn')
      .mockImplementation(async () => signInResponse);

    const params = { email: 'lucas@gmail.com', password: '123456' };
    expect(await controller.signin(params)).toBe(signInResponse);
  });

  it('should sign out a user', async () => {
    jest
      .spyOn(service, 'signOut')
      .mockImplementation(async () => signOutResponse);

    expect(await controller.signOut()).toBe(signOutResponse);
  });

  it('should verify a user', async () => {
    jest
      .spyOn(service, 'verify')
      .mockImplementation(async () => verifyUserResponse);

    const params = { email: 'lucas@gmail.com', code: '123456' };
    expect(await controller.verify(params)).toBe(verifyUserResponse);
  });

  it('should send an email to reset password', async () => {
    jest
      .spyOn(service, 'forgotPassword')
      .mockImplementation(async () => forgotPasswordResponse);

    const params = { email: 'lucas@gmail.com' };
    expect(await controller.forgotPassword(params)).toBe(
      forgotPasswordResponse,
    );
  });

  it('should change a user password', async () => {
    jest
      .spyOn(service, 'changePassword')
      .mockImplementation(async () => changePasswordResponse);

    const params = {
      email: 'lucas@gmail.com',
      code: '123456',
      password: '123456',
    };
    expect(await controller.changePassword(params)).toBe(
      changePasswordResponse,
    );
  });
});
