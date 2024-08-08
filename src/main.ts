import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  SwaggerConfig(app);

  await app.listen(8000);
}
bootstrap();
