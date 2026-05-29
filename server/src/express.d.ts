import { UserJWT } from './types';

declare namespace Express {
  interface Request {
    userJWT?: UserJWT;
  }
}
