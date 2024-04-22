import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserToRoom } from '../../chat/room/entities/user-to-room.entity';
import { Room } from '../../chat/room/entities/room.entity';
import { Message } from '../../chat/message/entity/message.entity';
import { Post } from '../../posts/entities/post.entity';
import { Like } from '../../like/entities/like.entity';

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

  //TODO add these in register flow
  // @Column({ nullable: false, type: 'varchar' })
  // title: string;
  //
  // @Column({ nullable: false, type: 'varchar' })
  // currentPosition: string;
  //
  // @Column({ nullable: false, type: 'varchar' })
  // industry: string;

  @Column({ nullable: false, type: 'varchar' })
  country: string;

  @Column({ nullable: false, type: 'varchar' })
  state: string;

  @Column({ nullable: true, type: 'varchar' })
  city: string;

  @Column({ nullable: true })
  socketId: string;

  @OneToMany(() => UserToRoom, (userToRoom) => userToRoom.user)
  userToRooms: UserToRoom[];

  @OneToMany(() => Room, (room) => room.host)
  roomsAsHost: Room[];

  @OneToMany(() => Message, (message) => message.author)
  messages: Message[];

  @ManyToMany(() => User, (user) => user.following)
  @JoinTable()
  followers: User[];

  @ManyToMany(() => User, (user) => user.followers)
  following: User[];

  @OneToMany(() => Post, (post) => post.author, { onDelete: 'CASCADE' })
  posts: Post[];

  @OneToMany(() => Like, (like) => like.author, { onDelete: 'CASCADE' })
  likes: Like[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
