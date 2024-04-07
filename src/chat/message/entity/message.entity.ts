import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../../../user/entities/user.entity';
import { Room } from '../../room/entities/room.entity';

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.messages)
  author: User;

  @Column()
  text: string;

  @ManyToOne(() => Room, (room) => room.messages)
  room: Room;

  @CreateDateColumn()
  createdAt: Date;
}
