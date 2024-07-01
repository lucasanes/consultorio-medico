import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class AuthService extends Redis {
  constructor() {
    super();
    super.on('connect', () => {
      console.log('Redis connected.');
    });
    this.on('error', (err) => {
      console.log('Error on Redis');
      console.log(err);
      process.exit(1);
    });
  }
}
