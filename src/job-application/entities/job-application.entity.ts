import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Job } from '../../job/entities/job.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class JobApplication extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext' })
  resume: string;

  @ManyToOne(() => Job, (job) => job.applications)
  job: Job;

  @ManyToOne(() => User, (user) => user.jobApplications)
  applicant: User;

  @CreateDateColumn()
  applicationDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
