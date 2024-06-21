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
const socket_constants_1 = require("../../common/constants/socket.constants");
const socket_io_1 = __importDefault(require("../../common/socket/socket-io"));
const centralizedContainer_1 = require("../../common/centralizedContainer/centralizedContainer");
const roomService = centralizedContainer_1.centralizedContainer.get(inversifyConstants_1.ROOM_INV.RoomService);
socket_io_1.default.on('connection', (socket) => {
    socket.on(socket_constants_1.SocketEventsClient.JOIN_ROOM, (addUserToRoomDto) => __awaiter(void 0, void 0, void 0, function* () {
        const { roomId, userId } = addUserToRoomDto;
        const room = yield roomService.addUserToRoom({
            userId,
            roomId,
        });
        if (!room) {
            return;
        }
        socket.join(room.name);
        socket.to(room.name).emit(socket_constants_1.SocketEventsServer.JOINED_ROOM, room);
    }));
    socket.on(socket_constants_1.SocketEventsClient.LEAVE_ROOM, (leaveRoomDto) => __awaiter(void 0, void 0, void 0, function* () {
        const { roomId } = leaveRoomDto;
        const room = yield roomService.findOneById(roomId);
        if (!room) {
            return;
        }
        socket.leave(room.name);
    }));
    socket.on(socket_constants_1.SocketEventsClient.CREATE_ONE_ON_ONE_ROOM, (createOneOnOneRoomDto) => __awaiter(void 0, void 0, void 0, function* () {
        const room = yield roomService.createOneOnOneRoom(createOneOnOneRoomDto);
        if (!room) {
            return;
        }
        socket.join(room.name);
        room.userToRooms.forEach((userToRoom) => {
            const user = userToRoom.user;
            if (user.socketId) {
                socket_io_1.default.to(user.socketId).emit(socket_constants_1.SocketEventsServer.CREATED_ONE_ON_ONE_ROOM, room);
            }
        });
        socket.to(room.name).emit(socket_constants_1.SocketEventsServer.JOINED_ROOM, room);
    }));
    socket.on(socket_constants_1.SocketEventsClient.GET_ALL_ROOMS_FOR_USER, ({ userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const rooms = yield roomService.findAllByUserId(userId);
        socket.emit(socket_constants_1.SocketEventsServer.ALL_ROOMS_FOR_USER, rooms);
    }));
});
//# sourceMappingURL=room.gateway.js.map