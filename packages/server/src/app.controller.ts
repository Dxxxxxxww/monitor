import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// 路由层，应该处理 HTTP 请求
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}


