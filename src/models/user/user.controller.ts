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
import { AuthGuard } from '../../common/guards/auth.guard';
import { FindOneParams } from '../../dto/FindOneParams';
import { CreateUserDTO } from './dto/create-user';
import { SignInUserDTO } from './dto/signin-user';
import { UpdateUserDTO } from './dto/update-user';
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

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param() params: FindOneParams,
    @Body()
    updateUserDTO: UpdateUserDTO,
  ) {
    return this.userService.update(+params.id, updateUserDTO);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param() params: FindOneParams) {
    return this.userService.remove(+params.id);
  }
}
