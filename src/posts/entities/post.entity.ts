import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Like } from '../../like/entities/like.entity';
import { Comment } from '../../comment/entities/comment.entity';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'longtext' })
  content: string;

  @Column({ nullable: true, type: 'longtext' })
  picture: string;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  author: User;

  @OneToMany(() => Like, (like) => like.post, { onDelete: 'CASCADE' })
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.post, { onDelete: 'CASCADE' })
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
