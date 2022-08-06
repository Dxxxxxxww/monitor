import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ErrorCaptureModule } from './module/error-capture-module/ec.module';

@Module({
  imports: [ErrorCaptureModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
