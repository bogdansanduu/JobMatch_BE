import passport from 'passport';
import { Request, Response, NextFunction } from 'express';

export function JwtAuth() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (req: Request, res: Response, next: NextFunction) {
      passport.authenticate('jwt', { session: false })(req, res, () => {
        originalMethod.apply(this, arguments);
      });
    };

    return descriptor;
  };
}
