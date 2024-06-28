import { Module } from '@nestjs/common';

import { PrismaModule } from '../../modules/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [AuthModule, PrismaModule],
  providers: [UserService, UserResolver],
  controllers: [UserController],
  exports: [],
})
export class UserModule {}
