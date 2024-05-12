import { Repository } from 'typeorm';

import { Job } from './entities/job.entity';
import { dataSource } from '../database/dataSource';
import { injectable } from 'inversify';

@injectable()
export class JobRepository {
  private readonly jobRepo: Repository<Job>;

  constructor() {
    this.jobRepo = dataSource.getRepository<Job>(Job);
  }

  findAll() {
    return this.jobRepo.find();
  }

  createJob(jobData: Partial<Job>) {
    const job = this.jobRepo.create(jobData);

    return this.jobRepo.save(job);
  }
}
