import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../../common/guards/admin.guard';
import { AuthGuard } from '../../common/guards/auth.guard';
import { FindOneParams } from '../../dto/FindOneParams';
import { AddressService } from './address.service';
import { CreateAddressDTO } from './dto/create-address';
import { UpdateAddressDTO } from './dto/update-address';

@ApiTags('address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param() params: FindOneParams) {
    return this.addressService.findOne(+params.id);
  }

  @Post()
  @UseGuards(AdminGuard)
  create(
    @Body(new ValidationPipe())
    createAddressDTO: CreateAddressDTO,
  ) {
    return this.addressService.create(createAddressDTO);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(
    @Param() params: FindOneParams,
    @Body(new ValidationPipe())
    updateAddressDTO: UpdateAddressDTO,
  ) {
    return this.addressService.update(+params.id, updateAddressDTO);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param() params: FindOneParams) {
    return this.addressService.remove(+params.id);
  }
}
