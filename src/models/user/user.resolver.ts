import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FindOneParamsGraphQL } from '../../dto/FindOneParamsGraphQL';
import { CreateUserDTO } from './dto/create-user';
import { SignInUserDTO } from './dto/signin-user';
import { UpdateUserIdDTO } from './dto/update-user-id';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'useres' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('params') params: FindOneParamsGraphQL) {
    return this.userService.findOne(+params.id);
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserDTO')
    createUserDTO: CreateUserDTO,
  ) {
    return this.userService.create(createUserDTO);
  }

  @Mutation(() => User)
  signIn(
    @Args('createUserDTO')
    signInUserDTO: SignInUserDTO,
  ) {
    return this.userService.signIn(signInUserDTO);
  }

  @Mutation(() => User)
  updateUser(
    @Args('updateUserDTO')
    updateUserDTO: UpdateUserIdDTO,
  ) {
    return this.userService.update(updateUserDTO.id, updateUserDTO);
  }

  @Mutation(() => User)
  removeUser(@Args('params') params: FindOneParamsGraphQL) {
    return this.userService.remove(+params.id);
  }
}
