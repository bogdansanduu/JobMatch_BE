"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketEventsServer = exports.SocketEventsClient = void 0;
var SocketEventsClient;
(function (SocketEventsClient) {
    SocketEventsClient["GET_ALL_ROOMS_FOR_USER"] = "getAllRoomsForUser";
    SocketEventsClient["CREATE_ONE_ON_ONE_ROOM"] = "createOneOnOneRoom";
    SocketEventsClient["JOIN_ROOM"] = "joinRoom";
    SocketEventsClient["GET_ALL_MESSAGES_FOR_ROOM"] = "getAllMessagesRoom";
    SocketEventsClient["SEND_MESSAGE_ROOM"] = "sendMessageRoom";
})(SocketEventsClient = exports.SocketEventsClient || (exports.SocketEventsClient = {}));
var SocketEventsServer;
(function (SocketEventsServer) {
    SocketEventsServer["ALL_ROOMS_FOR_USER"] = "allRoomsForUser";
    SocketEventsServer["ALL_MESSAGES_FOR_ROOM"] = "allMessagesRoom";
    SocketEventsServer["MESSAGE_ROOM"] = "messageRoom";
    SocketEventsServer["CREATED_ONE_ON_ONE_ROOM"] = "createdOneOnOneRoom";
    SocketEventsServer["JOINED_ROOM"] = "joinedRoom";
})(SocketEventsServer = exports.SocketEventsServer || (exports.SocketEventsServer = {}));
//# sourceMappingURL=socket.constants.js.map