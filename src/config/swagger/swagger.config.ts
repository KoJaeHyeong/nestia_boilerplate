import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import * as path from 'path';

dotenv.config();

export const SwaggerConfig = (app: INestApplication) => {
  const swaggerConfig = readFileSync(
    path.join(__dirname, '..', '..', '..', 'swagger.json'),
    'utf-8',
  );

  const swaggerDoc = JSON.parse(swaggerConfig);

  swaggerDoc.servers = [];

  SwaggerModule.setup('docs', app, swaggerDoc, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
    // customCss: '.servers { display: none }',
  });
};
