import { Repository } from 'typeorm';
import { inject, injectable } from 'inversify';

import { dataSource } from '../../database/dataSource';
import UserService from '../../user/user.service';

import { UserToRoom } from './entities/user-to-room.entity';
import { Room } from './entities/room.entity';
import { CreateOneOnOneRoomDto, CreateRoomDto } from './dtos/create-room.dto';
import { AddUserToRoomDto } from './dtos/add-user-to-room.dto';
import { USER_INV } from '../../common/utils/inversifyConstants';
import { NotFoundException } from '../../common/exceptions/not-found.exception';

@injectable()
export class RoomService {
  private roomRepository: Repository<Room>;
  private userToRoomRepository: Repository<UserToRoom>;
  private userService: UserService;

  constructor(
    @inject(USER_INV.UserService)
    userService: UserService
  ) {
    this.roomRepository = dataSource.getRepository(Room);
    this.userToRoomRepository = dataSource.getRepository(UserToRoom);
    this.userService = userService;
  }

  async findOneById(id: number) {
    return await this.roomRepository.findOne({
      where: {
        id,
      },
      relations: {
        userToRooms: {
          user: true,
        },
        host: true,
      },
      select: {
        id: true,
        name: true,
        oneOnOne: true,
        host: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          profilePicture: true,
          socketId: true,
        },
        userToRooms: {
          id: true,
          roomId: true,
          user: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            profilePicture: true,
            socketId: true,
          },
        },
      },
    });
  }

  async findOneByName(roomName: string) {
    return await this.roomRepository.findOne({
      where: {
        name: roomName,
      },
      relations: {
        userToRooms: {
          user: true,
        },
        host: true,
      },
      select: {
        id: true,
        name: true,
        oneOnOne: true,
        host: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          profilePicture: true,
          socketId: true,
        },
        userToRooms: {
          id: true,
          roomId: true,
          user: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            profilePicture: true,
            socketId: true,
          },
        },
      },
    });
  }

  async findAllByUserId(userId: number) {
    const rooms = await this.roomRepository.find({
      where: {
        userToRooms: {
          user: {
            id: userId,
          },
        },
      },
      relations: {
        userToRooms: {
          user: true,
        },
      },
      select: {
        id: true,
      },
    });

    return await Promise.all(
      rooms.map(async (room) => {
        return await this.findOneById(room.id);
      })
    );
  }

  private createRoomName(hostId: number, oneOnOne?: boolean, recipientId?: number, roomName?: string): string {
    if (oneOnOne) {
      return roomName ? roomName : `ROOM_${hostId}_${recipientId}`;
    } else {
      return roomName ? roomName : `ROOM_${hostId}`;
    }
  }

  async createRoom(createRoomDto: CreateRoomDto): Promise<Room | null> {
    const { hostId, oneOnOne, recipientId, roomName } = createRoomDto;
    const hostUser = await this.userService.getUserById(hostId);

    if (!hostUser) {
      throw new NotFoundException('User not found');
    }

    const currentRoomName = this.createRoomName(hostId, oneOnOne, recipientId, roomName);

    const room = this.roomRepository.create({
      oneOnOne: oneOnOne || false,
      name: currentRoomName,
      host: hostUser,
    });

    const savedRoom = await this.roomRepository.save(room);

    return this.findOneById(savedRoom.id);
  }

  async addUserToRoom(addUserToRoomDto: AddUserToRoomDto): Promise<Room | null> {
    const { userId, roomId } = addUserToRoomDto;
    const room = await this.findOneById(roomId);

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    const existingUserToRoom = await this.userToRoomRepository.findOne({
      where: { user: { id: userId }, room: { id: roomId } },
    });

    if (existingUserToRoom) {
      return room; // User already in the room
    }

    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userToRoom = this.userToRoomRepository.create({ user, room });
    await this.userToRoomRepository.save(userToRoom);

    return room;
  }

  async createOneOnOneRoom(createOneOnOneRoomDto: CreateOneOnOneRoomDto): Promise<Room | null> {
    const { hostId, recipientId } = createOneOnOneRoomDto;

    if (hostId === recipientId) {
      return null; // Same host and recipient, handle error
    }

    const searchedRoomName = this.createRoomName(hostId, true, recipientId);

    const existingRoom = await this.findOneByName(searchedRoomName);

    if (existingRoom) {
      return existingRoom; // One-on-One room already exists between the users
    }

    const room = await this.createRoom({ hostId, recipientId, oneOnOne: true });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    await this.addUserToRoom({ userId: recipientId, roomId: room.id });
    await this.addUserToRoom({ userId: hostId, roomId: room.id });

    return this.findOneById(room.id);
  }
}
