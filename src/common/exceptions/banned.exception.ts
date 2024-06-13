import { StatusCodes } from 'http-status-codes';
import { HttpException } from './http.exception';

export class BannedException extends HttpException {
  constructor(message?: string) {
    super(message || 'Banned', StatusCodes.FORBIDDEN);
  }
}
