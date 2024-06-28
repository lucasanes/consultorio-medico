import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindOneParams } from '../../dto/FindOneParams';
import { AddressService } from './address.service';
import { CreateAddressDTO } from './dto/create-address';
import { UpdateAddressDTO } from './dto/update-address';

@ApiTags('address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return this.addressService.findOne(+params.id);
  }

  @Post()
  create(
    @Body(new ValidationPipe())
    createAddressDTO: CreateAddressDTO,
  ) {
    return this.addressService.create(createAddressDTO);
  }

  @Patch(':id')
  update(
    @Param() params: FindOneParams,
    @Body(new ValidationPipe())
    updateAddressDTO: UpdateAddressDTO,
  ) {
    return this.addressService.update(+params.id, updateAddressDTO);
  }

  @Delete(':id')
  remove(@Param() params: FindOneParams) {
    return this.addressService.remove(+params.id);
  }
}
