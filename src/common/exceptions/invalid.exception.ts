import { StatusCodes } from 'http-status-codes';
import { HttpException } from './http.exception';

export class InvalidException extends HttpException {
  constructor(message?: string) {
    super(message || 'Invalid', StatusCodes.BAD_REQUEST);
  }
}
