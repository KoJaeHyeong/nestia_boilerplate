import { Prisma } from '@prisma/client';

export interface ISignUpUser
  extends Omit<Prisma.userCreateInput, 'id' | 'post'> {
  /**
   * @summary 유저 이름
   */
  name: string;
}

export interface IUSerInfo {
  /**
   * 유저 seq 아이디
   */
  id: string;

  /**
   * 유저 이름
   */
  name: string;

  /**
   * 유저 이메일
   */
  email: string;

  /**
   * 유저 전화번호
   */
  phone: string;
}
