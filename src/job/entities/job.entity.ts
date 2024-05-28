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
import { Company } from '../../company/entities/company.entity';
import { JobApplication } from '../../job-application/entities/job-application.entity';
import { JobSaved } from '../../job-saved/entities/job-saved.entity';

@Entity()
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column({ type: 'varchar' })
  category: string;

  @Column({ nullable: false, type: 'varchar' })
  country: string;

  @Column({ nullable: true, type: 'varchar' })
  state: string;

  @Column({ nullable: true, type: 'varchar' })
  city: string;

  @Column({ type: 'float' })
  lat: number;

  @Column({ type: 'float' })
  lng: number;

  @Column({ type: 'longtext', nullable: false })
  responsibilities: string;

  @Column({ type: 'longtext', nullable: false })
  minimumQualifications: string;

  @OneToMany(() => JobApplication, (jobApplication) => jobApplication.job)
  applications: JobApplication[];

  @OneToMany(() => JobSaved, (jobSaved) => jobSaved.job)
  saved: JobSaved[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'longtext', nullable: false })
  preferredQualifications: string;

  @ManyToOne(() => Company, (company) => company.jobs, { onDelete: 'CASCADE' })
  company: Company;
}
