import { StatusCodes } from 'http-status-codes';

export class HttpException extends Error {
  private readonly status: StatusCodes;
  constructor(message: string, status: StatusCodes) {
    super();

    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message || 'Something went wrong.';

    this.status = status || StatusCodes.INTERNAL_SERVER_ERROR;
  }

  getStatus() {
    return this.status;
  }

  getMessage() {
    return this.message;
  }
}
