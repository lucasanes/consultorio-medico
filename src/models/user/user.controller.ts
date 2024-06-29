import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { AuthGuard } from '../../common/guards/auth.guard';
import { FindOneParams } from '../../dto/FindOneParams';
import { ChangePasswordDTO } from './dto/change-password';
import { CreateUserDTO } from './dto/create-user';
import { ForgotPasswordDTO } from './dto/forgot-password';
import { SignInUserDTO } from './dto/signin-user';
import { UpdateUserDTO } from './dto/update-user';
import { VerifyUserDTO } from './dto/verify-user';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param() params: FindOneParams) {
    return this.userService.findOne(+params.id);
  }

  @Post()
  create(
    @Body()
    createUserDTO: CreateUserDTO,
  ) {
    return this.userService.create(createUserDTO);
  }

  @Post('signin')
  signin(
    @Body()
    signInUserDTO: SignInUserDTO,
  ) {
    return this.userService.signIn(signInUserDTO);
  }

  @Post('signout')
  signOut() {
    return this.userService.signOut();
  }

  @Post('verify')
  verify(
    @Body()
    verifyUserDTO: VerifyUserDTO,
  ) {
    return this.userService.verify(verifyUserDTO);
  }

  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordDTO: ForgotPasswordDTO) {
    return this.userService.forgotPassword(forgotPasswordDTO);
  }

  @Patch('change-password')
  changePassword(@Body() changePasswordDTO: ChangePasswordDTO) {
    return this.userService.changePassword(changePasswordDTO);
  }

  @Patch(':id')
  update(
    @Param() params: FindOneParams,
    @Body()
    updateUserDTO: UpdateUserDTO,
  ) {
    return this.userService.update(+params.id, updateUserDTO);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param() params: FindOneParams) {
    return this.userService.remove(+params.id);
  }
}
