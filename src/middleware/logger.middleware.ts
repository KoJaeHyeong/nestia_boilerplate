import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor() {}

  use(req: Request, res: Response, next: NextFunction) {
    const reqLogger = new Logger('Request');
    const resLogger = new Logger('Success');

    const { ip, method, originalUrl, body } = req;
    const userAgent = req.get('user-agent');

    reqLogger.log(`${method} ${originalUrl} ${ip} ${JSON.stringify(body)}`);

    res.on('finish', () => {
      const { statusCode } = res;
      resLogger.log(
        `${method} ${originalUrl} ${statusCode} ${ip} ${userAgent}`,
      );
    });

    next();
  }
}
