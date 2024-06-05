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
import { APPLICATION_STATUS } from '../../common/constants/job-application.constants';

@Entity()
export class JobApplication extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Job, (job) => job.applications)
  job: Job;

  @ManyToOne(() => User, (user) => user.jobApplications)
  applicant: User;

  @Column({
    type: 'enum',
    enum: APPLICATION_STATUS,
    default: APPLICATION_STATUS.PENDING,
  })
  status: APPLICATION_STATUS;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  observations: string;

  @CreateDateColumn()
  applicationDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
