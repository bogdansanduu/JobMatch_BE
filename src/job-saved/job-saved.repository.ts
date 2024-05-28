import { injectable } from 'inversify';
import { Repository } from 'typeorm';

import { JobSaved } from './entities/job-saved.entity';
import { dataSource } from '../database/dataSource';

@injectable()
export class JobSavedRepository {
  private readonly jobSavedRepo: Repository<JobSaved>;

  constructor() {
    this.jobSavedRepo = dataSource.getRepository<JobSaved>(JobSaved);
  }

  findAll() {
    return this.jobSavedRepo.find({
      relations: {
        job: {
          company: true,
        },
        user: true,
      },
    });
  }

  findAllByUser(userId: number) {
    return this.jobSavedRepo.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        job: {
          company: true,
        },
        user: true,
      },
    });
  }

  saveJob(jobSavedData: Partial<JobSaved>) {
    const jobSaved = this.jobSavedRepo.create(jobSavedData);

    return this.jobSavedRepo.save(jobSaved);
  }

  deleteSavedJob(jobSavedData: Partial<JobSaved>) {
    return this.jobSavedRepo.delete(jobSavedData);
  }
}
