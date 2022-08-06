import { Module } from '@nestjs/common';
import { ErrorCaptureController } from 'src/controller/error-capture-controller/ec.controller';
import { ErrorCaptureService } from 'src/service/error-capture-service/ec.service';

@Module({
  controllers: [ErrorCaptureController],
  providers: [ErrorCaptureService],
})
export class ErrorCaptureModule {}
