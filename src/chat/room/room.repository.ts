import { ILike, Or, Repository } from 'typeorm';

import { dataSource } from '../../database/dataSource';
import { Room } from './entities/room.entity';
import { injectable } from 'inversify';
import { UserToRoom } from './entities/user-to-room.entity';

@injectable()
export class RoomRepository {
  private readonly roomRepo: Repository<Room>;
  private readonly userToRoomRepo: Repository<UserToRoom>;

  constructor() {
    this.roomRepo = dataSource.getRepository<Room>(Room);
    this.userToRoomRepo = dataSource.getRepository<UserToRoom>(UserToRoom);
  }

  findOneById(id: number) {
    return this.roomRepo.findOne({
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

  findOneByName(roomName: string) {
    return this.roomRepo.findOne({
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

  findByUserId(userId: number) {
    return this.roomRepo.find({
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

  create(room: Partial<Room>) {
    return this.roomRepo.create(room);
  }

  save(room: Room) {
    return this.roomRepo.save(room);
  }

  async deleteByUserId(userId: number) {
    await this.userToRoomRepo.delete({
      user: {
        id: userId,
      },
    });

    await this.roomRepo.delete({
      name: Or(ILike(`%_${userId}_%`), ILike(`%_${userId}`)),
    });
  }
}
