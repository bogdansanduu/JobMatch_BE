import { StatusCodes } from 'http-status-codes';

import { HttpException } from './http.exception';

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(message || 'Not Found', StatusCodes.NOT_FOUND);
  }
}
