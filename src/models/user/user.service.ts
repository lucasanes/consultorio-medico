import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserDTO } from './dto/create-user';
import { SignInUserDTO } from './dto/signin-user';
import { UpdateUserDTO } from './dto/update-user';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private auth: AuthService,
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
    try {
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
      return this.prisma.user.create({
        data: { ...data, password: hashedPassword },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: number, data: UpdateUserDTO) {
    try {
      const user = await this.findOne(id);

      if (!user) {
        throw new NotFoundException(`Usuário não encontrado.`);
      }

      if (Role[data.role] === undefined) {
        throw new BadRequestException(`Cargo inválido.`);
      }

      if (data.email) {
        const userWithSameEmail = await this.prisma.user.findFirst({
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
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async signIn(data: SignInUserDTO) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (user && (await bcrypt.compare(data.password, user.password))) {
      const payload = { id: user.id, role: user.role };

      const token = this.jwtService
        .sign(payload, {
          secret: 'oi',
          expiresIn: '1d',
        })
        .toString();

      this.auth.saveToken(token);

      return token;
    }

    throw new BadRequestException(`Email e/ou senha incorretos.`);
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
