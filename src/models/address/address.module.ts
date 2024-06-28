import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { AddressController } from './address.controller';
import { AddressResolver } from './address.resolver';
import { AddressService } from './address.service';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [AddressService, AddressResolver],
  controllers: [AddressController],
})
export class AddressModule {}
