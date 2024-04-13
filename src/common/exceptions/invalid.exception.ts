import { HttpException } from './http.exception';
import { StatusCodes } from 'http-status-codes';

export class InvalidException extends HttpException {
  constructor(message?: string) {
    super(message || 'Invalid', StatusCodes.BAD_REQUEST);
  }
}
