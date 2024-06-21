import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Room } from './room.entity';
import { User } from '../../../user/entities/user.entity';

@Entity()
export class UserToRoom extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userToRooms)
  user: User;

  @Column()
  roomId: number;

  @ManyToOne(() => Room, (room) => room.userToRooms, { onDelete: 'CASCADE' })
  room: Room;
}
