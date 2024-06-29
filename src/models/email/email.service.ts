// email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'consultoriomedico.sender.api@gmail.com',
        pass: 'yefd lmdb acgh hjps',
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
