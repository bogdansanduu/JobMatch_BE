import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from '../../message/entity/message.entity';
import { UserToRoom } from './user-to-room.entity';
import { User } from '../../../user/entities/user.entity';

@Entity()
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.roomsAsHost)
  host: User;

  @Column({ nullable: true })
  name: string;

  @OneToMany(() => UserToRoom, (userToRoom) => userToRoom.room, { onDelete: 'CASCADE' })
  userToRooms: UserToRoom[];

  @OneToMany(() => Message, (message) => message.room, { onDelete: 'CASCADE' })
  messages: Message[];

  @Column({ default: false })
  oneOnOne: boolean;
}
