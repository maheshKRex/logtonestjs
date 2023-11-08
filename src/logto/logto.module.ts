import { Module } from '@nestjs/common';
import { LogtoController } from './logto.controller';
import { LogtoService } from './logto.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { LogtoStrategy } from '../auth/logto.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [LogtoController],
  providers: [LogtoService, LogtoStrategy],
})
export class LogtoModule {}
