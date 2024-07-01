import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { GenerateCode } from '../../../common/utils/generateCode';
import { AuthService } from '../../../models/auth/auth.service';
import { EmailService } from '../../../models/email/email.service';
import { PrismaService } from '../../../modules/prisma/prisma.service';
import { ChangePasswordDTO } from '../dto/change-password';
import { CreateUserDTO } from '../dto/create-user';
import { ForgotPasswordDTO } from '../dto/forgot-password';
import { SignInUserDTO } from '../dto/signin-user';
import { UpdateUserDTO } from '../dto/update-user';
import { VerifyUserDTO } from '../dto/verify-user';
import { UserService } from '../user.service';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;
  let authService: AuthService;
  let emailService: EmailService;
  let generateCode: GenerateCode;

  afterEach(() => {
    authService.disconnect();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        PrismaService,
        AuthService,
        PrismaService,
        EmailService,
        GenerateCode,
        ConfigService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              switch (key) {
                case 'JWT_SECRET':
                  return 'my_jwt_secret';
                case 'JWT_EXPIRES_IN':
                  return '1h';
                default:
                  return undefined;
              }
            }),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
    authService = module.get<AuthService>(AuthService);
    emailService = module.get<EmailService>(EmailService);
    generateCode = module.get<GenerateCode>(GenerateCode);
  });

  const createUserDTO: CreateUserDTO = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password',
    role: Role.USER,
  };

  const updateUserDTO: UpdateUserDTO = {
    name: 'Updated User',
    email: 'updated@example.com',
    password: 'newpassword',
    role: Role.USER,
  };

  const signInUserDTO: SignInUserDTO = {
    email: 'test@example.com',
    password: 'password',
  };

  const verifyUserDTO: VerifyUserDTO = {
    email: 'test@example.com',
    code: '123456',
  };

  const forgotPasswordDTO: ForgotPasswordDTO = {
    email: 'test@example.com',
  };

  const changePasswordDTO: ChangePasswordDTO = {
    email: 'test@example.com',
    code: '123456',
    password: 'newpassword',
  };

  const codeResponse = {
    id: 1,
    code: '123456',
    userEmail: 'lucas@gmail.com',
  };

  const userResponse = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    password: 'hashedpassword',
    role: Role.USER,
    isValidated: false,
  };

  describe('create', () => {
    it('should create a user', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedpassword');
      jest.spyOn(prismaService.user, 'create').mockResolvedValue(userResponse);

      jest.spyOn(generateCode, 'gerarCodigo').mockResolvedValue('123456');
      jest.spyOn(prismaService.code, 'create').mockResolvedValue(codeResponse);
      jest.spyOn(emailService, 'sendMail').mockResolvedValue();

      const result = await userService.create(createUserDTO);
      expect(result).toEqual(userResponse);
    });

    it('should throw BadRequestException if role is invalid', async () => {
      const invalidRoleDTO = { ...createUserDTO, role: 'INVALID_ROLE' };

      await expect(userService.create(invalidRoleDTO as any)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if email is already registered', async () => {
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(userResponse);

      await expect(userService.create(createUserDTO)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if code saving fails', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedpassword');
      jest.spyOn(prismaService.user, 'create').mockResolvedValue(userResponse);

      jest.spyOn(generateCode, 'gerarCodigo').mockResolvedValue('123456');
      jest.spyOn(prismaService.code, 'create').mockResolvedValue(null);

      await expect(userService.create(createUserDTO)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(userResponse);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('newhashedpassword');
      jest.spyOn(prismaService.user, 'update').mockResolvedValue(userResponse);

      const result = await userService.update(1, updateUserDTO);
      expect(result).toEqual(userResponse);
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      await expect(userService.update(1, updateUserDTO)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException if role is invalid', async () => {
      const invalidRoleDTO = { ...updateUserDTO, role: 'INVALID_ROLE' };
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(userResponse);

      await expect(
        userService.update(1, invalidRoleDTO as any),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if email is already registered', async () => {
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue({ ...userResponse, id: 2 });

      await expect(
        userService.update(1, { ...updateUserDTO, email: 'test@example.com' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should update password if provided', async () => {
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(userResponse);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('newhashedpassword');
      jest.spyOn(prismaService.user, 'update').mockResolvedValue(userResponse);

      const updatedPasswordDTO = { ...updateUserDTO, password: 'newpassword' };
      const result = await userService.update(1, updatedPasswordDTO);
      expect(result).toEqual(userResponse);
    });
  });

  describe('signIn', () => {
    it('should sign in user and return token', async () => {
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(userResponse);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest.spyOn(authService, 'set').mockResolvedValue(null);

      const result = await userService.signIn(signInUserDTO);
      expect(result).toHaveProperty('msg');
    });

    it('should throw BadRequestException if email or password is incorrect', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      await expect(userService.signIn(signInUserDTO)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if password is incorrect', async () => {
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(userResponse);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      await expect(userService.signIn(signInUserDTO)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('verify', () => {
    it('should verify user with valid code', async () => {
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(userResponse);
      jest
        .spyOn(prismaService.code, 'findFirst')
        .mockResolvedValue(codeResponse);
      jest.spyOn(prismaService.user, 'update').mockResolvedValue(userResponse);
      jest.spyOn(prismaService.code, 'delete').mockResolvedValue(codeResponse);

      const result = await userService.verify(verifyUserDTO);
      expect(result).toHaveProperty('msg');
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      await expect(userService.verify(verifyUserDTO)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException if code is invalid', async () => {
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(userResponse);
      jest.spyOn(prismaService.code, 'findFirst').mockResolvedValue(null);

      await expect(userService.verify(verifyUserDTO)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('forgotPassword', () => {
    it('should send email with reset code', async () => {
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(userResponse);
      jest.spyOn(generateCode, 'gerarCodigo').mockResolvedValue('123456');
      jest.spyOn(prismaService.code, 'create').mockResolvedValue(codeResponse);
      jest.spyOn(emailService, 'sendMail').mockResolvedValue();

      const result = await userService.forgotPassword(forgotPasswordDTO);
      expect(result).toHaveProperty('msg');
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      await expect(
        userService.forgotPassword(forgotPasswordDTO),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if code saving fails', async () => {
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(userResponse);
      jest.spyOn(generateCode, 'gerarCodigo').mockResolvedValue('123456');
      jest.spyOn(prismaService.code, 'create').mockResolvedValue(null);

      await expect(
        userService.forgotPassword(forgotPasswordDTO),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('changePassword', () => {
    it('should change user password with valid code', async () => {
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(userResponse);
      jest
        .spyOn(prismaService.code, 'findFirst')
        .mockResolvedValue(codeResponse);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('newhashedpassword');
      jest.spyOn(prismaService.user, 'update').mockResolvedValue(userResponse);
      jest.spyOn(prismaService.code, 'delete').mockResolvedValue(codeResponse);

      const result = await userService.changePassword(changePasswordDTO);
      expect(result).toHaveProperty('msg');
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      await expect(
        userService.changePassword(changePasswordDTO),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if code is invalid', async () => {
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(userResponse);
      jest.spyOn(prismaService.code, 'findFirst').mockResolvedValue(null);

      await expect(
        userService.changePassword(changePasswordDTO),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(userResponse);
      jest.spyOn(prismaService.user, 'delete').mockResolvedValue(userResponse);

      const result = await userService.remove(1);
      expect(result).toEqual(userResponse);
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      await expect(userService.remove(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should find all users', async () => {
      const usersList = [userResponse];
      jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(usersList);

      const result = await userService.findAll();
      expect(result).toEqual(usersList);
    });
  });
});
