import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { decode, verify } from 'jsonwebtoken';
import { AuthService } from '../../models/auth/auth.service';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { AuthGuard } from './auth.guard';

jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'),
  verify: jest.fn(),
  decode: jest.fn(),
}));

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let configService: ConfigService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
    authService = module.get<AuthService>(AuthService);
    configService = module.get<ConfigService>(ConfigService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should throw UnauthorizedException if no token is provided', async () => {
    (authService.get as jest.Mock).mockResolvedValue(null);

    await expect(guard.canActivate()).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if token is invalid', async () => {
    (authService.get as jest.Mock).mockResolvedValue('invalid-token');
    (configService.get as jest.Mock).mockReturnValue('secret');
    (verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    await expect(guard.canActivate()).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if user is not found', async () => {
    (authService.get as jest.Mock).mockResolvedValue('valid-token');
    (configService.get as jest.Mock).mockReturnValue('secret');
    (verify as jest.Mock).mockReturnValue({ id: 1 });
    (decode as jest.Mock).mockReturnValue({ id: 1 });
    (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(guard.canActivate()).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if user is not validated', async () => {
    (authService.get as jest.Mock).mockResolvedValue('valid-token');
    (configService.get as jest.Mock).mockReturnValue('secret');
    (verify as jest.Mock).mockReturnValue({ id: 1 });
    (decode as jest.Mock).mockReturnValue({ id: 1 });
    (prismaService.user.findUnique as jest.Mock).mockResolvedValue({
      isValidated: false,
      role: 'AUTH',
    });

    await expect(guard.canActivate()).rejects.toThrow(UnauthorizedException);
  });
});
