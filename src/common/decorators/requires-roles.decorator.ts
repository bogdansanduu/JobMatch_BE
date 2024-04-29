import { Response, NextFunction } from 'express';

import { StatusCodes } from 'http-status-codes';
import { RequestWithUserAndCompany } from '../types/passport.types';

export function RequiresRoles(roles: string[]) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (req: RequestWithUserAndCompany, res: Response, next: NextFunction) {
      if (!req.user) {
        return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized');
      }

      const user = req.user;
      const company = req.company;

      const userRoles = [user?.role, company?.role];

      const hasRequiredRole = roles.some((role) => userRoles.includes(role));

      if (!hasRequiredRole) {
        return res.status(StatusCodes.FORBIDDEN).send('Forbidden: Insufficient role');
      }

      return originalMethod.apply(this, arguments);
    };

    return descriptor;
  };
}
