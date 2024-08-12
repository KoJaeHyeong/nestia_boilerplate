import { TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * @internal default Route hide
   */

  @TypedRoute.Get()
  public getHello(): string {
    return this.appService.getHello();
  }
}
