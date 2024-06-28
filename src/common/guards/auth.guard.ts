import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './../../models/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
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
      await this.jwtService.verifyAsync(token, {
        secret: 'oi',
      });
    } catch (error) {
      throw new UnauthorizedException('Você não está autenticado.');
    }
    return true;
  }
}