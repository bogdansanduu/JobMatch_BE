"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const server_1 = require("./server");
const socket_io_1 = __importDefault(require("./common/socket/socket-io"));
const envConfig_1 = require("./common/utils/envConfig");
const appPort = (0, envConfig_1.getEnvVar)('APP_PORT', 'number');
const socketPort = (0, envConfig_1.getEnvVar)('SOCKET_PORT', 'number');
server_1.app.listen(appPort, () => {
    server_1.logger.info(`Server is running on port ${appPort}`);
});
socket_io_1.default.listen(socketPort);
//# sourceMappingURL=index.js.map