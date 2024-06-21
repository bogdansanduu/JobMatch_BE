import { CreateMessageDto } from './dtos/create-message.dto';
import { MESSAGE_INV, ROOM_INV } from '../../common/utils/inversifyConstants';
import { NotFoundException } from '../../common/exceptions/not-found.exception';
import { SocketEventsClient, SocketEventsServer } from '../../common/constants/socket.constants';

import MessageService from './message.service';
import ioSocket from '../../common/socket/socket-io';
import { RoomService } from '../room/room.service';
import { centralizedContainer } from '../../common/centralizedContainer/centralizedContainer';

const messageService = centralizedContainer.get<MessageService>(MESSAGE_INV.MessageService);
const roomService = centralizedContainer.get<RoomService>(ROOM_INV.RoomService);

ioSocket.on('connection', (socket) => {
  socket.on(SocketEventsClient.SEND_MESSAGE_ROOM, async (createMessageDto: CreateMessageDto) => {
    const message = await messageService.create(createMessageDto);
    const room = await roomService.findOneById(createMessageDto.roomId);

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    console.log(room.name);

    ioSocket.to(room.name).emit(SocketEventsServer.MESSAGE_ROOM, message);
  });

  socket.on(SocketEventsClient.GET_ALL_MESSAGES_FOR_ROOM, async ({ roomId }: { roomId: number }) => {
    const messages = await messageService.findAllByRoomId(roomId);
    const room = await roomService.findOneById(roomId);

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    socket.emit(SocketEventsServer.ALL_MESSAGES_FOR_ROOM, messages);
    // socket.to(room.name).emit(SocketEventsServer.ALL_MESSAGES_FOR_ROOM, messages);
  });
});
