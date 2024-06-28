import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FindOneParamsGraphQL } from '../../dto/FindOneParamsGraphQL';
import { Address } from './address.model';
import { AddressService } from './address.service';
import { CreateAddressDTO } from './dto/create-address';
import { UpdateAddressIdDTO } from './dto/update-address-id';

@Resolver(() => Address)
export class AddressResolver {
  constructor(private readonly addressService: AddressService) {}

  @Query(() => [Address], { name: 'addresses' })
  findAll() {
    return this.addressService.findAll();
  }

  @Query(() => Address, { name: 'address' })
  findOne(@Args('params') params: FindOneParamsGraphQL) {
    return this.addressService.findOne(+params.id);
  }

  @Mutation(() => Address)
  createAddress(
    @Args('createAddressDTO')
    createAddressDTO: CreateAddressDTO,
  ) {
    return this.addressService.create(createAddressDTO);
  }

  @Mutation(() => Address)
  updateAddress(
    @Args('updateAddressDTO')
    updateAddressDTO: UpdateAddressIdDTO,
  ) {
    return this.addressService.update(updateAddressDTO.id, updateAddressDTO);
  }

  @Mutation(() => Address)
  removeAddress(@Args('params') params: FindOneParamsGraphQL) {
    return this.addressService.remove(+params.id);
  }
}
