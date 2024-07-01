import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { GenerateCode } from './../../common/utils/generateCode';
import { EmailService } from './../email/email.service';
import { ChangePasswordDTO } from './dto/change-password';
import { CreateUserDTO } from './dto/create-user';
import { ForgotPasswordDTO } from './dto/forgot-password';
import { SignInUserDTO } from './dto/signin-user';
import { UpdateUserDTO } from './dto/update-user';
import { VerifyUserDTO } from './dto/verify-user';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private configService: ConfigService,
    private auth: AuthService,
    private generateCode: GenerateCode,
  ) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuário não encontrado.`);
    }

    return user;
  }

  async create(data: CreateUserDTO) {
    if (Role[data.role] === undefined) {
      throw new BadRequestException(`Cargo inválido.`);
    }

    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (user) {
      throw new BadRequestException(`Email já cadastrado.`);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });

    const code = (await this.generateCode.gerarCodigo()).toString();

    const saveCode = await this.prisma.code.create({
      data: { code, userEmail: newUser.email },
    });

    if (!saveCode) {
      throw new BadRequestException(`Erro ao salvar código.`);
    }

    this.emailService.sendMail(
      newUser.email,
      'Bem-vindo ao Consultório Médico API!',
      `Olá, ${newUser.name}! Seu código de verificação é: ${code}`,
    );

    return newUser;
  }

  async update(id: number, data: UpdateUserDTO) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`Usuário não encontrado.`);
    }

    if (data.role && Role[data.role] === undefined) {
      throw new BadRequestException(`Cargo inválido.`);
    }

    if (data.email) {
      const userWithSameEmail = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      if (userWithSameEmail && userWithSameEmail.id !== id) {
        throw new BadRequestException(`Email já cadastrado.`);
      }
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async signIn(data: SignInUserDTO) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (user && (await bcrypt.compare(data.password, user.password))) {
      const payload = {
        id: user.id,
      };

      const secret = this.configService.get<string>('JWT_SECRET');
      const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN');

      const token = sign(payload, secret, { expiresIn });

      await this.auth.set('token', token);

      return { msg: token };
    }

    throw new BadRequestException(`Email e/ou senha incorretos.`);
  }

  async signOut() {
    await this.auth.del('token');
    return { msg: 'Desconectado com sucesso.' };
  }

  async verify(verifyUserDTO: VerifyUserDTO) {
    const user = await this.prisma.user.findUnique({
      where: { email: verifyUserDTO.email },
    });

    if (!user) {
      throw new NotFoundException(`Usuário não encontrado.`);
    }

    const codeSaved = await this.prisma.code.findFirst({
      where: { code: verifyUserDTO.code, userEmail: verifyUserDTO.email },
    });

    if (!codeSaved) {
      throw new BadRequestException(`Código inválido.`);
    }

    await this.prisma.user.update({
      where: { email: verifyUserDTO.email },
      data: { isValidated: true },
    });

    await this.prisma.code.delete({
      where: { id: codeSaved.id },
    });

    return { msg: 'Usuário verificado com sucesso.' };
  }

  async forgotPassword(forgotPasswordDTO: ForgotPasswordDTO) {
    const user = await this.prisma.user.findUnique({
      where: { email: forgotPasswordDTO.email },
    });

    if (!user) {
      throw new NotFoundException(`Usuário não encontrado.`);
    }

    const code = (await this.generateCode.gerarCodigo()).toString();

    const saveCode = await this.prisma.code.create({
      data: { code, userEmail: user.email },
    });

    if (!saveCode) {
      throw new BadRequestException(`Erro ao salvar código.`);
    }

    this.emailService.sendMail(
      user.email,
      'Alteração de senha',
      `Olá, ${user.name}! Para alterar sua senha, utilize o código: ${code}`,
    );

    return { msg: 'Email enviado com sucesso.' };
  }

  async changePassword(changePasswordDTO: ChangePasswordDTO) {
    const user = await this.prisma.user.findUnique({
      where: { email: changePasswordDTO.email },
    });

    if (!user) {
      throw new NotFoundException(`Usuário não encontrado.`);
    }

    const codeSaved = await this.prisma.code.findFirst({
      where: {
        code: changePasswordDTO.code,
        userEmail: changePasswordDTO.email,
      },
    });

    if (!codeSaved) {
      throw new BadRequestException(`Código inválido.`);
    }

    const hashedPassword = await bcrypt.hash(changePasswordDTO.password, 10);

    await this.prisma.user.update({
      where: { email: changePasswordDTO.email },
      data: { password: hashedPassword },
    });

    await this.prisma.code.delete({
      where: { id: codeSaved.id },
    });

    return { msg: 'Senha alterada com sucesso.' };
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`Usuário não encontrado.`);
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
