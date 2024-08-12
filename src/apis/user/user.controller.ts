import { TypedBody, TypedParam, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ISignUpUser, IUSerInfo } from 'src/types/user/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   *
   * @param ISignUpUser sdsdsds
   * @returns void
   */
  @TypedRoute.Post()
  signUp(@TypedBody() createUserDto: ISignUpUser) {
    return this.userService.signUp(createUserDto);
  }

  /**
   * @summary 유저 등록 API
   * @param name 유저 이름
   * @return 유저 정보 조회 반환값
   */

  @TypedRoute.Get(':name')
  getUser(@TypedParam('name') name: string): Promise<IUSerInfo | undefined> {
    return this.userService.findUser(name);
  }
}
