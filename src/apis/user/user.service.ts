import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/db/database.service';
import { ISignUpUser, IUSerInfo } from 'src/types/user/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async signUp(reqDto: ISignUpUser): Promise<void> {
    await this.databaseService.user.create({
      data: reqDto,
    });
  }

  async findUser(reqDto: string): Promise<IUSerInfo | undefined> {
    const result: IUSerInfo[] = await this.databaseService.user.findMany({
      where: {
        name: reqDto,
      },
    });

    console.log(result);

    return result.at(0);
  }
}
