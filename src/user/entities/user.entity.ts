import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserToRoom } from '../../chat/room/entities/user-to-room.entity';
import { Room } from '../../chat/room/entities/room.entity';
import { Message } from '../../chat/message/entity/message.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'longtext' })
  profilePicture: string;

  @Column({ nullable: true })
  socketId: string;

  @OneToMany(() => UserToRoom, (userToRoom) => userToRoom.user)
  userToRooms: UserToRoom[];

  @OneToMany(() => Room, (room) => room.host)
  roomsAsHost: Room[];

  @OneToMany(() => Message, (message) => message.author)
  messages: Message[];
}
