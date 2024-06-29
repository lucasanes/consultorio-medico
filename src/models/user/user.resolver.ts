import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FindOneParamsGraphQL } from '../../dto/FindOneParamsGraphQL';
import { ChangePasswordDTO } from './dto/change-password';
import { CreateUserDTO } from './dto/create-user';
import { ForgotPasswordDTO } from './dto/forgot-password';
import { SignInUserDTO } from './dto/signin-user';
import { UpdateUserIdDTO } from './dto/update-user-id';
import { VerifyUserDTO } from './dto/verify-user';
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

  @Mutation(() => User, { name: 'signin' })
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

  @Query(() => String, { name: 'signout' })
  signOut() {
    return this.userService.signOut();
  }

  @Mutation(() => String, { name: 'verify' })
  verify(
    @Args('params')
    params: VerifyUserDTO,
  ) {
    return this.userService.verify(params);
  }

  @Mutation(() => String, { name: 'forgotPassword' })
  forgotPassword(@Args('params') params: ForgotPasswordDTO) {
    return this.userService.forgotPassword(params);
  }

  @Mutation(() => String, { name: 'changePassword' })
  changePassword(@Args('params') params: ChangePasswordDTO) {
    return this.userService.changePassword(params);
  }
}
