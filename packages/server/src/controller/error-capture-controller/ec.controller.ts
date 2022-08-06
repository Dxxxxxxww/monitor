import { Controller, Get, Post } from '@nestjs/common';
import { ErrorCapture } from 'src/interface/error-capture/ec.interface';
import { ErrorCaptureService } from 'src/service/error-capture-service/ec.service';

@Controller('catch')
export class ErrorCaptureController {
  constructor(private errorCaptureService: ErrorCaptureService) {}

  @Get()
  async findALL(): Promise<ErrorCapture[]> {
    return this.errorCaptureService.findAll();
  }

  @Post()
  async catchError(): Promise<T> {}
}
