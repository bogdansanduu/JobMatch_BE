"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const http_exception_1 = require("../exceptions/http.exception");
const unexpectedRequest = (_req, res) => {
    res.sendStatus(http_status_codes_1.StatusCodes.NOT_FOUND);
};
const addErrorToRequestLog = (err, _req, res, next) => {
    res.locals.err = err;
    next(err);
};
const defaultErrorRequestHandler = (_err, _req, res) => {
    res.sendStatus(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
};
const errorMiddleware = (err, req, res, next) => {
    if (err instanceof http_exception_1.HttpException) {
        const status = err.getStatus();
        const message = err.getMessage();
        res.status(status).json({ error: message });
    }
    else {
        next(err);
    }
};
exports.default = () => [unexpectedRequest, addErrorToRequestLog, errorMiddleware, defaultErrorRequestHandler];
//# sourceMappingURL=error-handler.middleware.js.map