import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';
import { passportJwtSecret } from 'jwks-rsa';
@Injectable()
export class LogtoStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://7oknml.logto.app/oidc/jwks',
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: 'http://localhost:3000/landing', //optional!
      issuer: 'https://7oknml.logto.app/oidc',
      algorithms: ['ES384'],
    });
  }

  async validate(req: Request, input: any) {
    console.log('validate %j', req);
    //console.log(util.inspect(req));
    return req;
  }
  extractBearerTokenFromHeaders = ({ authorization }: IncomingHttpHeaders) => {
    if (!authorization) {
      throw new Error('Authorization header is missing');
    }

    if (!authorization.startsWith('Bearer')) {
      throw Error('Authorization header is not in the Bearer scheme');
    }

    return authorization.slice(7); // The length of 'Bearer ' is 7
  };
}
