import { Test, TestingModule } from '@nestjs/testing';
import { LogtoController } from './logto/logto.controller';
import { LogtoService } from './logto/logto.service';

describe('AppController', () => {
  let appController: LogtoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LogtoController],
      providers: [LogtoService],
    }).compile();

    appController = app.get<LogtoController>(LogtoController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
