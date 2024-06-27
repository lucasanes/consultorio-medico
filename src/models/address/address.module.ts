import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { AddressController } from './address.controller';
import { AddressResolver } from './address.resolver';
import { AddressService } from './address.service';

@Module({
  imports: [PrismaModule],
  providers: [AddressService, AddressResolver],
  controllers: [AddressController],
})
export class AddressModule {}
