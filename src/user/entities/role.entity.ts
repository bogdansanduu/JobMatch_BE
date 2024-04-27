import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { User } from './user.entity';

export enum Roles {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
