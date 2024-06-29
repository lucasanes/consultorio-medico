import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminGuard } from '../../common/guards/admin.guard';
import { AuthGuard } from '../../common/guards/auth.guard';
import { FindOneParamsGraphQL } from '../../dto/FindOneParamsGraphQL';
import { Address } from './address.model';
import { AddressService } from './address.service';
import { CreateAddressDTO } from './dto/create-address';
import { UpdateAddressIdDTO } from './dto/update-address-id';

@Resolver(() => Address)
export class AddressResolver {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(AuthGuard)
  @Query(() => [Address], { name: 'addresses' })
  findAll() {
    return this.addressService.findAll();
  }

  @UseGuards(AuthGuard)
  @Query(() => Address, { name: 'address' })
  findOne(@Args('params') params: FindOneParamsGraphQL) {
    return this.addressService.findOne(+params.id);
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Address)
  createAddress(
    @Args('createAddressDTO')
    createAddressDTO: CreateAddressDTO,
  ) {
    return this.addressService.create(createAddressDTO);
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Address)
  updateAddress(
    @Args('updateAddressDTO')
    updateAddressDTO: UpdateAddressIdDTO,
  ) {
    return this.addressService.update(updateAddressDTO.id, updateAddressDTO);
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Address)
  removeAddress(@Args('params') params: FindOneParamsGraphQL) {
    return this.addressService.remove(+params.id);
  }
}
