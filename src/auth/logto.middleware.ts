import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LogtoExpressConfig, withLogto } from '@logto/express';
import * as util from 'util';
import { IncomingHttpHeaders } from 'http';
//import { useLogto } from '@logto/react';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private config: LogtoExpressConfig = {
    appId: 'gjg3wvxywxefqb02ofsti', // Replace with your own appId
    appSecret: 'djhz1hb61e30ly0epm1nm', // Replace with your own appSecret
    endpoint: 'https://7oknml.logto.app/',
    baseUrl: 'http://localhost:3000',
    getAccessToken: true,
    resources: ['http://localhost:3000/landing'],
    scopes: ['read:resource'],
  };
  use(req, res, next: NextFunction) {
   // withLogto({
  //    ...this.config,
      // Fetch user info from remote, this may slowdown the response time, not recommended.
      //fetchUserInfo: true,
 //     getAccessToken: true,
      //resources: ['http://localhost:3000/local-user-claims'],
      //scopes: ['read:resource'],
  //  });
    //console.log(util.inspect(req));
    verifyAuthFromRequest(req.session.idToken, res, next());
    next();
  }
}

const extractBearerTokenFromHeaders = ({
  authorization,
}: IncomingHttpHeaders) => {
  if (!authorization) {
    throw new Error('auth.authorization_header_missing');
  }

  if (!authorization.startsWith('Bearer')) {
    throw new Error('auth.authorization_token_type_not_supported');
  }

  return authorization.slice('Bearer'.length + 1);
};

// auth-middleware.ts

import { createRemoteJWKSet, jwtVerify } from 'jose';

//...

export const verifyAuthFromRequest = async (token, res, next) => {
  // Extract the token
  //const token = extractBearerTokenFromHeaders(req.headers);
  console.log('%j', token);
  const { payload } = await jwtVerify(
    token, // The raw Bearer Token extracted from the request header
    createRemoteJWKSet(new URL('https://7oknml.logto.app/oidc/jwks')), // generate a jwks using jwks_uri inquired from Logto server
    {
      // expected issuer of the token, should be issued by the Logto server
      issuer: 'https://7oknml.logto.app/oidc',
      // expected audience token, should be the resource indicator of the current API
      audience: 'http://localhost:3000/landing',
    },
  );

  // if you are using RBAC
  //assert(payload.scope.includes('some_scope'));

  // custom payload logic
  //userId = payload.sub;

  /*console.log('%j', payload);
  const { getAccessToken, isAuthenticated } = useLogto();
  if (isAuthenticated) {
    const accessToken = await getAccessToken('http://localhost:3000/landing');
    console.log(accessToken); // eyJhbG...
  }*/
};
