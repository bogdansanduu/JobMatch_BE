"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiresRoles = void 0;
const http_status_codes_1 = require("http-status-codes");
function RequiresRoles(roles) {
    return (target, propertyKey, descriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = function (req, res, next) {
            if (!req.user) {
                return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send('Unauthorized');
            }
            const user = req.user;
            const company = req.company;
            const userRoles = [user === null || user === void 0 ? void 0 : user.role, company === null || company === void 0 ? void 0 : company.role];
            const hasRequiredRole = roles.some((role) => userRoles.includes(role));
            if (!hasRequiredRole) {
                return res.status(http_status_codes_1.StatusCodes.FORBIDDEN).send('Forbidden: Insufficient role');
            }
            return originalMethod.apply(this, arguments);
        };
        return descriptor;
    };
}
exports.RequiresRoles = RequiresRoles;
//# sourceMappingURL=requires-roles.decorator.js.map