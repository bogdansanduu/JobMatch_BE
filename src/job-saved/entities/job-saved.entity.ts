import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Job } from '../../job/entities/job.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class JobSaved {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Job, (job) => job.saved)
  job: Job;

  @ManyToOne(() => User, (user) => user.jobsSaved)
  user: User;

  @CreateDateColumn()
  savedAt: Date;
}
