import { ROOM_INV } from '../../common/utils/inversifyConstants';
import { AddUserToRoomDto } from './dtos/add-user-to-room.dto';
import { CreateOneOnOneRoomDto } from './dtos/create-room.dto';
import { SocketEventsClient, SocketEventsServer } from '../../common/constants/socket.constants';

import { RoomService } from './room.service';
import ioSocket from '../../common/socket/socket-io';
import { centralizedContainer } from '../../common/centralizedContainer/centralizedContainer';
import { LeaveRoomDto } from './dtos/leave-room.dto';

const roomService = centralizedContainer.get<RoomService>(ROOM_INV.RoomService);

ioSocket.on('connection', (socket) => {
  socket.on(SocketEventsClient.JOIN_ROOM, async (addUserToRoomDto: AddUserToRoomDto) => {
    const { roomId, userId } = addUserToRoomDto;

    const room = await roomService.addUserToRoom({
      userId,
      roomId,
    });

    if (!room) {
      //TODO handle error
      return;
    }

    socket.join(room.name);
    socket.to(room.name).emit(SocketEventsServer.JOINED_ROOM, room);
  });

  socket.on(SocketEventsClient.LEAVE_ROOM, async (leaveRoomDto: LeaveRoomDto) => {
    const { roomId } = leaveRoomDto;

    const room = await roomService.findOneById(roomId);

    if (!room) {
      //TODO handle error
      return;
    }

    socket.leave(room.name);
  });

  socket.on(SocketEventsClient.CREATE_ONE_ON_ONE_ROOM, async (createOneOnOneRoomDto: CreateOneOnOneRoomDto) => {
    const room = await roomService.createOneOnOneRoom(createOneOnOneRoomDto);

    if (!room) {
      //TODO handle error
      return;
    }

    socket.join(room.name);

    room.userToRooms.forEach((userToRoom) => {
      const user = userToRoom.user;

      if (user.socketId) {
        ioSocket.to(user.socketId).emit(SocketEventsServer.CREATED_ONE_ON_ONE_ROOM, room);
      }
    });

    socket.to(room.name).emit(SocketEventsServer.JOINED_ROOM, room);
  });

  socket.on(SocketEventsClient.GET_ALL_ROOMS_FOR_USER, async ({ userId }: { userId: number }) => {
    const rooms = await roomService.findAllByUserId(userId);

    socket.emit(SocketEventsServer.ALL_ROOMS_FOR_USER, rooms);
  });
});
