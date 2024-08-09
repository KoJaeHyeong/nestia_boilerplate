import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService
  extends PrismaClient<Prisma.PrismaClientOptions, 'query' | 'error'>
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(DatabaseService.name);

  constructor(private readonly configService: ConfigService) {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'stdout',
          level: 'info',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
      ],
    });
  }

  async onModuleInit() {
    if (this.configService.get('NODE_ENV') === 'dev') {
      this.$on('query', (event) => {
        this.logger.debug(event.query, `${event.duration}ms`);
      });
    }

    this.$on('error', (event) => {
      this.logger.verbose(event.target);
    });

    await this.$connect()
      .then(() => this.logger.log(DatabaseService.name, 'DB CONNECTED'))
      .catch((err: any) => this.logger.log(DatabaseService.name, err.message));
  }

  async onModuleDestroy() {
    this.logger.log(DatabaseService.name, 'DB DISCONNECTED');
    await this.$disconnect();
  }
}
