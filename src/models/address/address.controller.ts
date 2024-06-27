import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDTO } from './dto/create-address';
import { UpdateAddressDTO } from './dto/update-address';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.addressService.findOne(+id);
  }

  @Post()
  create(
    @Body()
    createAddressDTO: CreateAddressDTO,
  ) {
    return this.addressService.create(createAddressDTO);
  }

  @Patch(':id')
  update(
    @Param('id')
    id: string,
    @Body()
    updateAddressDTO: UpdateAddressDTO,
  ) {
    return this.addressService.update(+id, updateAddressDTO);
  }

  @Delete(':id')
  remove(
    @Param('id')
    id: string,
  ) {
    return this.addressService.remove(+id);
  }
}
