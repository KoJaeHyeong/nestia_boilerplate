import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import * as path from 'path';

dotenv.config();

export const SwaggerConfig = (app: INestApplication) => {
  const swaggerConfig = readFileSync(path.join(__dirname, '..', '..', 'swagger.json'), 'utf-8');

  const swaggerDoc = JSON.parse(swaggerConfig);
  const env = process.env.NODE_ENV;

  swaggerDoc.servers.at(0).url = env === 'dev' ? 'http://localhost:8000' : 'https://kkkk.co.kr';

  SwaggerModule.setup('docs', app, swaggerDoc);
};
