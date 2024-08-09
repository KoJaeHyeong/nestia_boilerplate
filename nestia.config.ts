import { INestiaConfig } from '@nestia/sdk';
import * as dotenv from 'dotenv';

dotenv.config();

const NESTIA_CONFIG: INestiaConfig = {
  input: ['src/apis/**/*.controller.ts', 'src/*.controller.ts'],
  output: 'src/',

  swagger: {
    servers: [],
    openapi: '3.1',
    // output: 'dist/swagger.json',
    output: 'src/config/swagger/swagger.json',
    beautify: true,
    info: {
      version: '1.0.0',
      license: {
        name: 'Server_Api_BoilerPlate',
      },
    },
  },
};
export default NESTIA_CONFIG;
