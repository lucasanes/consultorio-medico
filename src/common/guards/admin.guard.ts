import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Role } from '@prisma/client';
import { decode, verify } from 'jsonwebtoken';
import { AuthService } from './../../models/auth/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private configService: ConfigService,
  ) {}

  async canActivate(): Promise<boolean> {
    const token = this.auth.getToken();
    if (!token) {
      throw new UnauthorizedException('Você não está autenticado.');
    }

    const secret = this.configService.get<string>('JWT_SECRET');

    try {
      verify(token, secret);

      const payload = decode(token) as {
        id: number;
        role: Role;
        isValidated: boolean;
      };

      if (!payload) {
        throw new UnauthorizedException('Você não está autenticado.');
      }

      if (!payload.isValidated) {
        throw new UnauthorizedException(
          'Você não está verificado. Verifique seu email.',
        );
      }

      if (payload.role != 'ADMIN') {
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
