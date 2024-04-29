import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Entity,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Company } from '../../company/entities/company.entity';

@Entity()
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  refreshToken: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Company)
  @JoinColumn()
  company: Company;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
