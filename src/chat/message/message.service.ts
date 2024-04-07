import { Repository } from 'typeorm';
import { inject, injectable } from 'inversify';

import { Message } from './entity/message.entity';
import { CreateMessageDto } from './dtos/create-message.dto';
import { ROOM_INV, USER_INV } from '../../common/utils/inversifyConstants';
import { NotFoundException } from '../../common/exceptions/not-found.exception';

import { RoomService } from '../room/room.service';
import UserService from '../../user/user.service';
import { dataSource } from '../../database/dataSource';

@injectable()
class MessageService {
  private messageRepo: Repository<Message>;
  private userService: UserService;
  private roomService: RoomService;

  //TODO make repos
  constructor(
    @inject(USER_INV.UserService)
    userService: UserService,
    @inject(ROOM_INV.RoomService)
    roomService: RoomService
  ) {
    this.messageRepo = dataSource.getRepository(Message);
    this.userService = userService;
    this.roomService = roomService;
  }

  async create(createMessageDto: CreateMessageDto) {
    const { userId, text, roomId } = createMessageDto;

    const room = await this.roomService.findOneById(roomId);
    const user = await this.userService.findOneById(userId);

    if (!room || !user) {
      throw new NotFoundException('User or room not found');
    }

    const newMessage = this.messageRepo.create({
      author: user,
      text,
      room,
    });

    return this.messageRepo.save(newMessage);
  }

  async findAllByRoomId(roomId: number) {
    return await this.messageRepo.find({
      where: {
        room: {
          id: roomId,
        },
      },
      relations: {
        author: true,
        room: true,
      },
      select: {
        id: true,
        text: true,
        createdAt: true,
        author: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          profilePicture: true,
        },
        room: {
          id: true,
        },
      },
    });
  }
}

export default MessageService;
