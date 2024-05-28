import { inject, injectable } from 'inversify';

import { JobSavedRepository } from './job-saved.repository';
import { JOB_INV, JOB_SAVED_INV, USER_INV } from '../common/utils/inversifyConstants';
import { JobService } from '../job/job.service';
import UserService from '../user/user.service';
import { NotFoundException } from '../common/exceptions/not-found.exception';

@injectable()
export class JobSavedService {
  private readonly jobSavedRepo: JobSavedRepository;
  private readonly jobService: JobService;
  private readonly userService: UserService;
  constructor(
    @inject(JOB_SAVED_INV.JobSavedRepository)
    jobSavedRepo: JobSavedRepository,
    @inject(JOB_INV.JobService) jobService: JobService,
    @inject(USER_INV.UserService) userService: UserService
  ) {
    this.jobSavedRepo = jobSavedRepo;
    this.jobService = jobService;
    this.userService = userService;
  }

  async getAllSavedJobs() {
    return this.jobSavedRepo.findAll();
  }

  async saveJob(userId: number, jobId: number) {
    const job = await this.jobService.getJobById(jobId);
    const user = await this.userService.getUserById(userId);

    if (!job || !user) {
      throw new NotFoundException('Job or User not found');
    }

    return this.jobSavedRepo.saveJob({ job, user });
  }

  async unsaveJob(userId: number, jobId: number) {
    const job = await this.jobService.getJobById(jobId);
    const user = await this.userService.getUserById(userId);

    if (!job || !user) {
      throw new NotFoundException('Job or User not found');
    }

    await this.jobSavedRepo.deleteSavedJob({ job, user });
  }

  async getAllSavedJobsForUser(userId: number) {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.jobSavedRepo.findAllByUser(userId);
  }
}
