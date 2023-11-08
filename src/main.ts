import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { LogtoExpressConfig } from '@logto/express';
import { handleAuthRoutes, withLogto } from '@logto/express';
import * as cookieParser from 'cookie-parser';
import type { Request, Response, NextFunction } from 'express';
import * as session from 'express-session';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: LogtoExpressConfig = {
    appId: 'gjg3wvxywxefqb02ofsti', // Replace with your own appId
    appSecret: 'djhz1hb61e30ly0epm1nm', // Replace with your own appSecret
    endpoint: 'https://7oknml.logto.app/',
    baseUrl: 'http://localhost:3000',
  };

  const requireAuth = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    if (!request.user.isAuthenticated) {
      response.redirect('/logto/sign-in');
    }

    next();
  };

  app.use(cookieParser());
  app.use(
    session({
      secret: '9hdovtgrq67ichcqpxravo0tcvw3jaws',
    }),
  );

  app.use(handleAuthRoutes(config));
  await app.listen(3000);
}
bootstrap();
