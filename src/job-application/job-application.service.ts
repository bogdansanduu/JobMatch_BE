import { inject, injectable } from 'inversify';

import { JobApplicationRepository } from './job-application.repository';
import { JOB_APPLICATION_INV, JOB_INV, USER_INV } from '../common/utils/inversifyConstants';
import { JobService } from '../job/job.service';
import UserService from '../user/user.service';
import { NotFoundException } from '../common/exceptions/not-found.exception';

@injectable()
export class JobApplicationService {
  private jobApplicationRepository: JobApplicationRepository;
  private jobService: JobService;
  private userService: UserService;

  constructor(
    @inject(JOB_APPLICATION_INV.JobApplicationRepository) jobApplicationRepository: JobApplicationRepository,
    @inject(JOB_INV.JobService) jobService: JobService,
    @inject(USER_INV.UserService) userService: UserService
  ) {
    this.jobApplicationRepository = jobApplicationRepository;
    this.jobService = jobService;
    this.userService = userService;
  }

  async getAllJobApplications() {
    return this.jobApplicationRepository.findAll();
  }

  async getJobApplicationById(id: number) {
    return this.jobApplicationRepository.findOne(id);
  }

  async applyForJob(userId: number, jobId: number, resume: string) {
    const job = await this.jobService.getJobById(jobId);
    const applicant = await this.userService.getUserById(userId);

    if (!job || !applicant) {
      throw new NotFoundException('Job or User not found');
    }

    return this.jobApplicationRepository.createJobApplication({
      job,
      applicant,
      resume,
    });
  }
}
