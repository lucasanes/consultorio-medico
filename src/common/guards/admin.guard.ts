import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { decode, verify } from 'jsonwebtoken';
import { AuthService } from '../../models/auth/auth.service';
import { PrismaService } from '../../modules/prisma/prisma.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private prismaService: PrismaService,
  ) {}

  async canActivate(): Promise<boolean> {
    const token = await this.authService.get('token');
    if (!token) {
      throw new UnauthorizedException('Você não está autenticado.');
    }

    const secret = this.configService.get<string>('JWT_SECRET');

    try {
      verify(token, secret);

      const payload = decode(token) as {
        id: number;
      };

      if (!payload) {
        throw new UnauthorizedException('Você não está autenticado.');
      }

      const user = await this.prismaService.user.findUnique({
        where: {
          id: payload.id,
        },
      });

      if (!user) {
        throw new UnauthorizedException('Você não está autenticado.');
      }

      if (!user.isValidated) {
        throw new UnauthorizedException(
          'Você não está verificado. Verifique seu email.',
        );
      }

      if (user.role != 'ADMIN') {
        throw new UnauthorizedException(
          'Você não tem permissão para acessar esse recurso.',
        );
      }
    } catch (error) {
      throw new UnauthorizedException(error);
    }
    return true;
  }
}
