import { Prisma } from '@prisma/client';

export interface ISignUpUser
  extends Omit<Prisma.userCreateInput, 'id' | 'post'> {
  /**
   * @format string;
   */
  name: string;
}
