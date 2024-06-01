import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Roles } from '../../common/constants/user.constants';
import { Post } from '../../posts/entities/post.entity';
import { Like } from '../../like/entities/like.entity';
import { Job } from '../../job/entities/job.entity';

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'longtext' })
  profilePicture: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column({ nullable: false, type: 'varchar' })
  industry: string;

  @Column({ nullable: false, type: 'varchar' })
  country: string;

  @Column({ nullable: true, type: 'varchar' })
  state: string;

  @Column({ nullable: true, type: 'varchar' })
  city: string;

  @OneToOne(() => User, (user) => user.company)
  @JoinColumn()
  owner: User;

  @Column({ type: 'enum', enum: Roles, default: Roles.COMPANY })
  role: string;

  @OneToMany(() => Post, (post) => post.author, { onDelete: 'CASCADE' })
  posts: Post[];

  @OneToMany(() => Like, (like) => like.company, { onDelete: 'CASCADE' })
  likes: Like[];

  @OneToMany(() => Job, (job) => job.company, { onDelete: 'CASCADE' })
  jobs: Job[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //TODO
  //add employees
  //add followers
  //add posts
}
