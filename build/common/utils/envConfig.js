"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVar = exports.getCorsOrigin = exports.getNodeEnv = exports.getPort = void 0;
const getPort = () => getEnvVar('PORT', 'number');
exports.getPort = getPort;
const getNodeEnv = () => getEnvVar('NODE_ENV', 'string');
exports.getNodeEnv = getNodeEnv;
const getCorsOrigin = () => getEnvVar('CORS_ORIGIN', 'string');
exports.getCorsOrigin = getCorsOrigin;
function getEnvVar(key, type) {
    const value = process.env[key];
    if (value == null) {
        throw new Error(`Unknown process.env.${key}: ${value}. Is your .env file setup?`);
    }
    if (type === 'number') {
        const numValue = parseInt(value);
        if (Number.isNaN(numValue)) {
            throw new Error(`process.env.${key} must be a number. Got ${value}`);
        }
        return numValue;
    }
    return value;
}
exports.getEnvVar = getEnvVar;
//# sourceMappingURL=envConfig.js.map