import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { LogtoModule } from './logto/logto.module';
import { LoggerMiddleware } from './auth/logto.middleware';

@Module({
  imports: [LogtoModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'local-user-claims', method: RequestMethod.GET });
  }
}
