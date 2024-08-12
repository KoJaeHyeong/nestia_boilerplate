import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import * as path from 'path';

export const SwaggerConfig = (app: INestApplication) => {
  const swaggerConfig = readFileSync(
    path.join(__dirname, '..', '..', '..', 'swagger.json'),
    'utf-8',
  );

  const swaggerDoc = JSON.parse(swaggerConfig);

  // swaggerDoc.servers.at(0).url = `${ip.address()}:${process.env.PORT}`;
  // swaggerDoc.servers.at(0).description = 'SERVER_API';

  swaggerDoc.servers = [];

  SwaggerModule.setup('docs', app, swaggerDoc, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
    customCss: '.servers { display: none }',
  });
};
