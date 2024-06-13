"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const socket_io_1 = require("socket.io");
const passport_1 = __importDefault(require("passport"));
const server_1 = require("../../server");
const dataSource_1 = require("../../database/dataSource");
const user_entity_1 = require("../../user/entities/user.entity");
const http_exception_1 = require("../exceptions/http.exception");
const ioSocket = new socket_io_1.Server(http.createServer(server_1.app), {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
const userRepository = dataSource_1.dataSource.getRepository(user_entity_1.User);
ioSocket.use((socket, next) => {
    if (socket.request.headers.authorization) {
        passport_1.default.authenticate('jwt', { session: false }, (err, payload) => {
            if (err || !payload) {
                return next(new http_exception_1.HttpException('Authentication error', 401));
            }
            next();
        })(socket.request, {}, next);
        return;
    }
    next(new http_exception_1.HttpException('Authentication error', 401));
});
ioSocket.use((socket, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(socket.handshake.query.userId);
    if (!userId) {
        next();
        return;
    }
    const user = yield userRepository.findOne({
        where: {
            id: userId,
        },
    });
    if (!user) {
        next();
        return;
    }
    user.socketId = socket.id;
    yield userRepository.save(user);
    next();
}));
ioSocket.on('connection', (socket) => {
    console.log(`User connected with socket id ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`User disconnected with socket id ${socket.id}`);
    });
});
exports.default = ioSocket;
//# sourceMappingURL=socket-io.js.map