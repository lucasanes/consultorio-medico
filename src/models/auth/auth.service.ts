import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private token: string | null = null;

  saveToken(token: string): void {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  deleteToken(): void {
    this.token = null;
  }
}
