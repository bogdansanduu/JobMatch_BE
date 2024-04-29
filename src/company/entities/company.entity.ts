import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Roles } from '../../common/constants/user.constants';

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: false, type: 'varchar' })
  industry: string;

  @Column({ nullable: false, type: 'varchar' })
  country: string;

  @Column({ nullable: false, type: 'varchar' })
  state: string;

  @Column({ nullable: true, type: 'varchar' })
  city: string;

  @OneToOne(() => User, (user) => user.company)
  @JoinColumn()
  owner: User;

  @Column({ type: 'enum', enum: Roles, default: Roles.COMPANY })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //TODO
  //add employees
  //add followers
  //add posts
}
