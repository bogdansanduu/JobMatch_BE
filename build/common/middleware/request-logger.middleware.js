"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const pino_http_1 = require("pino-http");
const envConfig_1 = require("../utils/envConfig");
const requestLogger = (options) => {
    const pinoOptions = Object.assign({ customProps: customProps, redact: ['request.headers', 'response.headers'], genReqId,
        customLogLevel,
        customSuccessMessage, customReceivedMessage: (req) => `request received: ${req.method}`, customErrorMessage: (_req, res) => `request errored with status code: ${res.statusCode}`, customAttributeKeys }, options);
    return [responseBodyMiddleware, (0, pino_http_1.pinoHttp)(pinoOptions)];
};
const customAttributeKeys = {
    req: 'request',
    res: 'response',
    err: 'error',
    responseTime: 'timeTaken',
};
const customProps = (req, res) => ({
    request: req,
    response: res,
    err: res.locals.err,
    responseBody: res.locals.responseBody,
});
const responseBodyMiddleware = (_req, res, next) => {
    const env = (0, envConfig_1.getNodeEnv)() !== 'production';
    if (env) {
        const originalSend = res.send;
        res.send = function (content) {
            res.locals.responseBody = content;
            res.send = originalSend;
            return originalSend.call(res, content);
        };
    }
    next();
};
const customLogLevel = (_req, res, err) => {
    if (res.statusCode >= 400 && res.statusCode < 500)
        return 'warn';
    if (res.statusCode >= 500 || err)
        return 'error';
    if (res.statusCode >= 300 && res.statusCode < 400)
        return 'silent';
    return 'info';
};
const customSuccessMessage = (req, res) => {
    if (res.statusCode === 404)
        return 'resource not found';
    return `${req.method} completed`;
};
const genReqId = (req, res) => {
    var _a;
    const existingID = (_a = req.id) !== null && _a !== void 0 ? _a : req.headers['x-request-id'];
    if (existingID)
        return existingID;
    const id = (0, crypto_1.randomUUID)();
    res.setHeader('X-Request-Id', id);
    return id;
};
exports.default = requestLogger;
//# sourceMappingURL=request-logger.middleware.js.map