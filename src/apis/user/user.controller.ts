import { TypedBody, TypedParam, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ISignUpUser } from 'src/types/user/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @TypedRoute.Post()
  signUp(@TypedBody() createUserDto: ISignUpUser) {
    return this.userService.signUp(createUserDto);
  }

  @TypedRoute.Get(':name')
  getUser(@TypedParam('name') name: string) {
    return this.userService.findUser(name);
  }
}
