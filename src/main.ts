import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces';
import * as ip from 'ip';
import { AppModule } from './app.module';
import { SwaggerConfig } from './config/swagger/swagger.config';

class Application {
  private logger = new Logger(Application.name);
  private readonly corsOriginList: string[] | boolean;
  private readonly PORT: number;

  constructor(
    private readonly server: NestExpressApplication,
    private readonly configService: ConfigService,
  ) {
    this.server = server;
    this.corsOriginList =
      this.configService
        .get<string>('CORS_LIST')
        ?.split(',')
        .map((origin) => origin.trim()) ?? true;

    this.PORT = Number(this.configService.get<number>('PORT'));
  }

  // 전역 미들웨어
  private async setGlobalMiddleWare() {
    this.server.enableCors({
      origin: this.corsOriginList,
      credentials: true,
    });

    SwaggerConfig(this.server); //todo Swagger를 한번 generate 해줘야함.

    this.server.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // type 에 맞지 않는 param 들어올시 에러
        forbidNonWhitelisted: true, // type 에 맞지 않는 param 들어올시 에러
        transform: true,
        transformOptions: {
          enableImplicitConversion: true, // query parameter 암묵적으로 타입 변환
        },
      }),
    );
    this.server.useGlobalInterceptors(
      new ClassSerializerInterceptor(this.server.get(Reflector)),
    );
  }

  // 미들웨어 및 서버 개방
  async bootstrap() {
    await this.setGlobalMiddleWare();
    await this.server.listen(this.PORT, () => {
      // if (this.configService.get<string>('NODE_ENV') !== 'dev') {
      //   if (typeof process.send !== 'undefined') {
      //     process.send('ready');
      //   }
      // }
    });

    // process.on('SIGINT', async () => {
    //   await this.server.close();

    //   console.log('SERVER CLOSED!');
    //   process.exit(0);
    // });

    this.serverLog();
  }

  // 개발 서버 & 상용 서버 로그 분기
  serverLog() {
    if (this.configService.get<string>('NODE_ENV') === 'dev') {
      this.logger.log(
        `✅ Server on http://${ip.address()}:${this.PORT} / http://${ip.address()}:${this.PORT}/docs`,
      );
    } else {
      this.logger.log(`✅ Server on http://${ip.address()}:${this.PORT}`);
    }
  }
}

const init = async (): Promise<void> => {
  const server = await NestFactory.create<NestExpressApplication>(AppModule);
  server.enableShutdownHooks(); // server 종료 시 DB Pool 종료
  const app = new Application(server, new ConfigService());

  await app.bootstrap();
};

// init 시 에러 로그 처리
init().catch((err) => {
  new Logger('init').error(err);
});
