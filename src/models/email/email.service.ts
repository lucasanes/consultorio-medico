// email.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    const pass = this.configService.get<string>('EMAIL_PASS');

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'consultoriomedico.sender.api@gmail.com',
        pass,
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'consultoriomedico.sender.api@gmail.com',
      to,
      subject,
      text,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
