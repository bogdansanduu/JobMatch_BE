"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const server_1 = require("./server");
const socket_io_1 = __importDefault(require("./common/socket/socket-io"));
const appPort = parseInt(process.env.APP_PORT || '3000');
const socketPort = parseInt(process.env.SOCKET_PORT || '3001');
server_1.app.listen(appPort, () => {
    server_1.logger.info(`Server is running on port ${appPort}`);
});
socket_io_1.default.listen(socketPort);
//# sourceMappingURL=index.js.map