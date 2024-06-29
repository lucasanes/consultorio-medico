import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@prisma/client';
import { GenerateCode } from '../../../common/utils/generateCode';
import { AuthService } from '../../../models/auth/auth.service';
import { EmailService } from '../../../models/email/email.service';
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

  const signInDTO = {
    email: 'eu@gmail.com',
    password: '123456',
  };

  const signInResponse = {
    msg: '3123131.',
  };

  const signOutResponse = {
    msg: 'Desconectado com sucesso.',
  };

  const verifyDTO = {
    email: 'lucas@gmail.com',
    code: '123456',
  };

  const verifyResponse = {
    msg: 'Usuário verificado com sucesso.',
  };

  const sendEmailDTO = {
    email: 'lucas@gmail.com',
  };

  const sendEmailResponse = {
    msg: 'Email enviado com sucesso.',
  };

  const changePasswordDTO = {
    email: 'lucas@gmail.com',
    code: '123456',
    password: '123456',
  };

  const changePasswordResponse = {
    msg: 'Senha alterada com sucesso.',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        PrismaService,
        JwtService,
        AuthService,
        EmailService,
        ConfigService,
        GenerateCode,
      ],
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

  it('should signin', async () => {
    jest
      .spyOn(service, 'signIn')
      .mockImplementation(async () => signInResponse);

    expect(await service.signIn(signInDTO)).toBe(signInResponse);
  });

  it('should signout', async () => {
    jest
      .spyOn(service, 'signOut')
      .mockImplementation(async () => signOutResponse);

    expect(await service.signOut()).toBe(signOutResponse);
  });

  it('should verify a user', async () => {
    jest
      .spyOn(service, 'verify')
      .mockImplementation(async () => verifyResponse);

    expect(await service.verify(verifyDTO)).toBe(verifyResponse);
  });

  it('should send email', async () => {
    jest
      .spyOn(service, 'forgotPassword')
      .mockImplementation(async () => sendEmailResponse);

    expect(await service.forgotPassword(sendEmailDTO)).toBe(sendEmailResponse);
  });

  it('should change password', async () => {
    jest
      .spyOn(service, 'changePassword')
      .mockImplementation(async () => changePasswordResponse);

    expect(await service.changePassword(changePasswordDTO)).toBe(
      changePasswordResponse,
    );
  });
});
