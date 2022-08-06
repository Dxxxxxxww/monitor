import { ErrorCapture } from 'src/interface/error-capture/ec.interface';

export class ErrorCaptureService {
  private readonly ecs: ErrorCapture[] = [];

  create(cat: ErrorCapture) {
    this.ecs.push(cat);
  }

  findAll(): ErrorCapture[] {
    return this.ecs;
  }
}
