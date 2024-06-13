"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuth = void 0;
const passport_1 = __importDefault(require("passport"));
const http_status_codes_1 = require("http-status-codes");
function JwtAuth() {
    return (target, propertyKey, descriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = function (req, res, next) {
            passport_1.default.authenticate('jwt', { session: false }, (err, payload) => {
                if (err || !payload) {
                    return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send();
                }
                req.user = payload;
                req.company = payload;
                return originalMethod.apply(this, arguments);
            })(req, res, next);
        };
        return descriptor;
    };
}
exports.JwtAuth = JwtAuth;
//# sourceMappingURL=jwt-auth.decorator.js.map