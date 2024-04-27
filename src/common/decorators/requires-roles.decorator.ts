import { Request, Response, NextFunction } from 'express';

import { StatusCodes } from 'http-status-codes';
import { User } from '../../user/entities/user.entity';

export function RequiresRoles(roles: string[]) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (req: Request, res: Response, next: NextFunction) {
      if (!req.user) {
        return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized');
      }

      const user = req.user as User;

      const hasRequiredRole = roles.some((role) => user.role === role);

      if (!hasRequiredRole) {
        return res.status(StatusCodes.FORBIDDEN).send('Forbidden: Insufficient role');
      }

      return originalMethod.apply(this, arguments);
    };

    return descriptor;
  };
}
