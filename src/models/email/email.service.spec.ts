import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as nodemailer from 'nodemailer';
import { EmailService } from './email.service';

jest.mock('nodemailer');

describe('EmailService', () => {
  let service: EmailService;
  let transporterMock;

  beforeEach(async () => {
    transporterMock = {
      sendMail: jest.fn(),
    };

    (nodemailer.createTransport as jest.Mock).mockReturnValue(transporterMock);

    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService, ConfigService],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send an email', async () => {
    const to = 'test@example.com';
    const subject = 'Test Subject';
    const text = 'Test Text';

    await service.sendMail(to, subject, text);

    expect(transporterMock.sendMail).toHaveBeenCalledWith({
      from: 'consultoriomedico.sender.api@gmail.com',
      to,
      subject,
      text,
    });
  });

  it('should handle sendMail errors', async () => {
    transporterMock.sendMail.mockImplementation(() => {
      throw new Error('Failed to send email');
    });

    const to = 'test@example.com';
    const subject = 'Test Subject';
    const text = 'Test Text';

    await expect(service.sendMail(to, subject, text)).rejects.toThrow(
      'Failed to send email',
    );
  });
});
