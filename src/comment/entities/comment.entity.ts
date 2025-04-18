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

import { Post } from '../../posts/entities/post.entity';
import { User } from '../../user/entities/user.entity';
import { Like } from '../../like/entities/like.entity';
import { Company } from '../../company/entities/company.entity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  post: Post;

  @OneToMany(() => Like, (like) => like.comment, { onDelete: 'CASCADE' })
  likes: Like[];

  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @ManyToOne(() => Company, (company) => company.posts)
  company: Company;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
