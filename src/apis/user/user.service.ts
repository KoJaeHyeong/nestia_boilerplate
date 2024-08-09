import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import { DatabaseService } from 'src/db/database.service';
import { ISignUpUser } from 'src/types/user/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async signUp(reqDto: ISignUpUser): Promise<void> {
    await this.databaseService.user.create({
      data: reqDto,
    });
  }

  async findUser(reqDto: string): Promise<user | undefined> {
    const result: user[] = await this.databaseService.user.findMany({
      where: {
        name: reqDto,
      },
    });

    return result.at(0);
  }
}
