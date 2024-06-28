import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './../../models/auth/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private auth: AuthService,
  ) {}

  async canActivate(): Promise<boolean> {
    const token = this.auth.getToken();
    if (!token) {
      throw new UnauthorizedException('Você não está autenticado.');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'oi',
      });

      if (payload.role != 'ADMIN') {
        throw new UnauthorizedException(
          'Você não tem permissão para acessar esse recurso.',
        );
      }
    } catch (error) {
      throw new UnauthorizedException(
        'Você não tem permissão para acessar esse recurso.',
      );
    }
    return true;
  }
}
