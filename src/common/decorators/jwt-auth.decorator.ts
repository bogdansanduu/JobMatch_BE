import passport from 'passport';
import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RequestWithUserAndCompany } from '../types/passport.types';

export function JwtAuth() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (req: RequestWithUserAndCompany, res: Response, next: NextFunction) {
      passport.authenticate('jwt', { session: false }, (err, payload) => {
        if (err || !payload) {
          return res.status(StatusCodes.UNAUTHORIZED).send();
        }

        req.user = payload;
        req.company = payload;

        return originalMethod.apply(this, arguments);
      })(req, res, next);
    };

    return descriptor;
  };
}
