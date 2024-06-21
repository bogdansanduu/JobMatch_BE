"use strict";
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
const inversifyConstants_1 = require("../../common/utils/inversifyConstants");
const not_found_exception_1 = require("../../common/exceptions/not-found.exception");
const socket_constants_1 = require("../../common/constants/socket.constants");
const socket_io_1 = __importDefault(require("../../common/socket/socket-io"));
const centralizedContainer_1 = require("../../common/centralizedContainer/centralizedContainer");
const messageService = centralizedContainer_1.centralizedContainer.get(inversifyConstants_1.MESSAGE_INV.MessageService);
const roomService = centralizedContainer_1.centralizedContainer.get(inversifyConstants_1.ROOM_INV.RoomService);
socket_io_1.default.on('connection', (socket) => {
    socket.on(socket_constants_1.SocketEventsClient.SEND_MESSAGE_ROOM, (createMessageDto) => __awaiter(void 0, void 0, void 0, function* () {
        const message = yield messageService.create(createMessageDto);
        const room = yield roomService.findOneById(createMessageDto.roomId);
        if (!room) {
            throw new not_found_exception_1.NotFoundException('Room not found');
        }
        console.log(room.name);
        socket_io_1.default.to(room.name).emit(socket_constants_1.SocketEventsServer.MESSAGE_ROOM, message);
    }));
    socket.on(socket_constants_1.SocketEventsClient.GET_ALL_MESSAGES_FOR_ROOM, ({ roomId }) => __awaiter(void 0, void 0, void 0, function* () {
        const messages = yield messageService.findAllByRoomId(roomId);
        const room = yield roomService.findOneById(roomId);
        if (!room) {
            throw new not_found_exception_1.NotFoundException('Room not found');
        }
        socket.emit(socket_constants_1.SocketEventsServer.ALL_MESSAGES_FOR_ROOM, messages);
    }));
});
//# sourceMappingURL=message.gateway.js.map