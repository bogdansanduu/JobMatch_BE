"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidException = void 0;
const http_exception_1 = require("./http.exception");
const http_status_codes_1 = require("http-status-codes");
class InvalidException extends http_exception_1.HttpException {
    constructor(message) {
        super(message || 'Invalid', http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
}
exports.InvalidException = InvalidException;
//# sourceMappingURL=invalid.exception.js.map