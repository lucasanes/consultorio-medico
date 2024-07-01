import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@prisma/client';
import { FindOneParamsGraphQL } from '../../../dto/FindOneParamsGraphQL';
import { AuthService } from '../../../models/auth/auth.service';
import { PrismaService } from '../../../modules/prisma/prisma.service';
import { UserResolver } from '../user.resolver';
import { UserService } from '../user.service';
import { MsgResponse } from './../msgResponse.model';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let service: UserService;
  let authService: AuthService;

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        AuthService,
        PrismaService,
        ConfigService,
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
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

    resolver = module.get<UserResolver>(UserResolver);
    service = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    authService.disconnect();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a user', async () => {
    jest.spyOn(service, 'create').mockImplementation(async () => userResponse);

    expect(await resolver.createUser(userDTO)).toBe(userResponse);
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

  it('should sign in', async () => {
    jest
      .spyOn(service, 'signIn')
      .mockImplementation(async () => signInResponse);

    expect(await resolver.signIn(userDTO)).toBe(signInResponse);
  });

  it('should sign out', async () => {
    jest
      .spyOn(service, 'signOut')
      .mockImplementation(async () => signOutResponse);

    expect(await resolver.signOut()).toBe(signOutResponse);
  });

  it('should verify user', async () => {
    jest
      .spyOn(service, 'verify')
      .mockImplementation(async () => verifyUserResponse);
    const params = { email: 'lucas@gmail.com', token: 'token', code: '123456' };
    expect(await resolver.verify(params)).toBe(verifyUserResponse);
  });

  it('should forgot password', async () => {
    jest
      .spyOn(service, 'forgotPassword')
      .mockImplementation(async () => forgotPasswordResponse);
    const params = { email: 'lucas@gmail.com' };
    expect(await resolver.forgotPassword(params)).toBe(forgotPasswordResponse);
  });

  it('should change password', async () => {
    jest
      .spyOn(service, 'changePassword')
      .mockImplementation(async () => changePasswordResponse);
    const params = {
      email: 'lucas@gmail.com',
      code: '123456',
      password: '123456',
    };
    expect(await resolver.changePassword(params)).toBe(changePasswordResponse);
  });
});
