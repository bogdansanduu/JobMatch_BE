"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
const http_status_codes_1 = require("http-status-codes");
const http_exception_1 = require("./http.exception");
class NotFoundException extends http_exception_1.HttpException {
    constructor(message) {
        super(message || 'Not Found', http_status_codes_1.StatusCodes.NOT_FOUND);
    }
}
exports.NotFoundException = NotFoundException;
//# sourceMappingURL=not-found.exception.js.map