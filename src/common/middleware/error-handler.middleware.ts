import { ErrorRequestHandler, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpException } from '../exceptions/http.exception';

const unexpectedRequest: RequestHandler = (_req, res) => {
  res.sendStatus(StatusCodes.NOT_FOUND);
};

const addErrorToRequestLog: ErrorRequestHandler = (err, _req, res, next) => {
  res.locals.err = err;
  next(err);
};

const defaultErrorRequestHandler: ErrorRequestHandler = (_err, _req, res) => {
  res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
};

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HttpException) {
    const status = err.getStatus();
    const message = err.getMessage();
    res.status(status).json({ error: message });
  } else {
    next(err);
  }
};

export default () => [unexpectedRequest, addErrorToRequestLog, errorMiddleware, defaultErrorRequestHandler];
