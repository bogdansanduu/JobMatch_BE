"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannedException = void 0;
const http_status_codes_1 = require("http-status-codes");
const http_exception_1 = require("./http.exception");
class BannedException extends http_exception_1.HttpException {
    constructor(message) {
        super(message || 'Banned', http_status_codes_1.StatusCodes.FORBIDDEN);
    }
}
exports.BannedException = BannedException;
//# sourceMappingURL=banned.exception.js.map