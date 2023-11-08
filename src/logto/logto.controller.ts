import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { LogtoService } from './logto.service';
import type { LogtoExpressConfig } from '@logto/express';
import { handleAuthRoutes, withLogto } from '@logto/express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LogtoAuthGuard } from '../auth/logto-auth.guard';
import * as util from "util";

@Controller()
export class LogtoController {
  constructor(private readonly appService: LogtoService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/local-user-claims')
  //@UseGuards(LogtoAuthGuard)
  async get(@Request() request) {
    return request.session;
  }

  @Get('/landing')
  @UseGuards(LogtoAuthGuard)
  async landing(@Request() request) {
    console.log(util.inspect(request));
    return request.user;
  }
}
