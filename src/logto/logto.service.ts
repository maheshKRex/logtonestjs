import { Injectable } from '@nestjs/common';

@Injectable()
export class LogtoService {
  getHello(): string {
    return 'Hello World!';
  }
}
