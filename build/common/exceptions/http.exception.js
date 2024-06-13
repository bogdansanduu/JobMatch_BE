"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
const http_status_codes_1 = require("http-status-codes");
class HttpException extends Error {
    constructor(message, status) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message || 'Something went wrong.';
        this.status = status || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    }
    getStatus() {
        return this.status;
    }
    getMessage() {
        return this.message;
    }
}
exports.HttpException = HttpException;
//# sourceMappingURL=http.exception.js.map