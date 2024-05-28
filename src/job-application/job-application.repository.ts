import { Repository } from 'typeorm';
import { injectable } from 'inversify';

import { JobApplication } from './entities/job-application.entity';
import { dataSource } from '../database/dataSource';

@injectable()
export class JobApplicationRepository {
  private readonly jobApplicationRepo: Repository<JobApplication>;

  constructor() {
    this.jobApplicationRepo = dataSource.getRepository<JobApplication>(JobApplication);
  }

  findAll() {
    return this.jobApplicationRepo.find({
      relations: {
        job: {
          company: true,
        },
        applicant: true,
      },
    });
  }

  findAllByUser(userId: number) {
    return this.jobApplicationRepo.find({
      where: {
        applicant: {
          id: userId,
        },
      },
      relations: {
        job: {
          company: true,
        },
        applicant: true,
      },
    });
  }

  findOne(id: number) {
    return this.jobApplicationRepo.findOne({
      where: {
        id,
      },
      relations: {
        job: {
          company: true,
        },
        applicant: true,
      },
    });
  }

  createJobApplication(jobApplicationData: Partial<JobApplication>) {
    const jobApplication = this.jobApplicationRepo.create(jobApplicationData);

    return this.jobApplicationRepo.save(jobApplication);
  }
}
