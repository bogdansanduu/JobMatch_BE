import { inject, injectable } from 'inversify';

import { JobApplicationRepository } from './job-application.repository';
import { JOB_APPLICATION_INV, JOB_INV, USER_INV } from '../common/utils/inversifyConstants';
import { JobService } from '../job/job.service';
import UserService from '../user/user.service';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { ReviewApplicationValidation } from './dtos/review-application.validation';

@injectable()
export class JobApplicationService {
  private readonly jobApplicationRepo: JobApplicationRepository;
  private readonly jobService: JobService;
  private readonly userService: UserService;

  constructor(
    @inject(JOB_APPLICATION_INV.JobApplicationRepository) jobApplicationRepository: JobApplicationRepository,
    @inject(JOB_INV.JobService) jobService: JobService,
    @inject(USER_INV.UserService) userService: UserService
  ) {
    this.jobApplicationRepo = jobApplicationRepository;
    this.jobService = jobService;
    this.userService = userService;
  }

  async getAllJobApplications() {
    return this.jobApplicationRepo.findAll();
  }

  async getJobApplicationById(id: number) {
    return this.jobApplicationRepo.findOne(id);
  }

  async applyForJob(userId: number, jobId: number) {
    const job = await this.jobService.getJobById(jobId);
    const applicant = await this.userService.getUserById(userId);

    if (!job || !applicant) {
      throw new NotFoundException('Job or User not found');
    }

    return this.jobApplicationRepo.createJobApplication({
      job,
      applicant,
    });
  }

  async reviewApplication(id: number, data: ReviewApplicationValidation) {
    const application = await this.jobApplicationRepo.findOne(id);

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    await this.jobApplicationRepo.updateJobApplicationStatus(id, data);

    return this.jobApplicationRepo.findOne(id);
  }

  async getAllJobApplicationsForUser(userId: number) {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.jobApplicationRepo.findAllByUser(userId);
  }

  async getAllJobApplicationsForJob(jobId: number) {
    const job = await this.jobService.getJobById(jobId);

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return this.jobApplicationRepo.findAllByJob(jobId);
  }

  removeApplicationsByUserId(userId: number) {
    return this.jobApplicationRepo.deleteByUserId(userId);
  }

  removeApplicationsByCompanyId(companyId: number) {
    return this.jobApplicationRepo.deleteByCompanyId(companyId);
  }
}
