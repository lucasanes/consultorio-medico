import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaModule } from '../../modules/prisma/prisma.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
    ConfigModule,
  ],
  providers: [AuthService, JwtService],
  controllers: [],
  exports: [AuthService, JwtService],
})
export class AuthModule {}
