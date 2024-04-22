import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Post } from '../../posts/entities/post.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, (post: Post) => post.likes, { onDelete: 'CASCADE' })
  post: Post;

  @ManyToOne(() => User, (user: User) => user.likes, { onDelete: 'CASCADE' })
  author: User;
}
