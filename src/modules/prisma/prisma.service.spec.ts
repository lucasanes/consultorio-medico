import { Test, TestingModule } from '@nestjs/testing';
import * as dotenv from 'dotenv';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeAll(async () => {
    dotenv.config();

    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await service.$disconnect();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should connect to the database on module init', async () => {
    const connectSpy = jest.spyOn(service, '$connect');
    await service.onModuleInit();
    expect(connectSpy).toHaveBeenCalled();
  });

  it('should disconnect from the database on module destroy', async () => {
    const disconnectSpy = jest.spyOn(service, '$disconnect');
    await service.onModuleDestroy();
    expect(disconnectSpy).toHaveBeenCalled();
  });
});
