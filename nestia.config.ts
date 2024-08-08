import { INestiaConfig } from '@nestia/sdk';
import * as dotenv from 'dotenv';

dotenv.config();

const NESTIA_CONFIG: INestiaConfig = {
  input: ['src/apis/**/*.controller.ts', 'src/*.controller.ts'],
  output: 'src/',

  swagger: {
    openapi: '3.1',
    output: 'dist/swagger.json',
    beautify: true,
  },
};
export default NESTIA_CONFIG;
