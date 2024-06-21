import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Post } from '../../posts/entities/post.entity';
import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Company } from '../../company/entities/company.entity';

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, (post: Post) => post.likes, { onDelete: 'CASCADE' })
  post: Post;

  @ManyToOne(() => Comment, (comment) => comment.likes, { onDelete: 'CASCADE' })
  comment: Comment;

  @ManyToOne(() => User, (user: User) => user.likes)
  author: User;

  @ManyToOne(() => Company, (company: Company) => company.likes)
  company: Company;
}
