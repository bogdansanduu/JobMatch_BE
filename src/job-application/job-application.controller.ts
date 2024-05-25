import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';

import { JobApplicationService } from './job-application.service';
import { JOB_APPLICATION_INV } from '../common/utils/inversifyConstants';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class JobApplicationController {
  private readonly jobApplicationService: JobApplicationService;

  constructor(
    @inject(JOB_APPLICATION_INV.JobApplicationService)
    jobApplicationService: JobApplicationService
  ) {
    this.jobApplicationService = jobApplicationService;
  }

  async getAllJobApplications(req: Request, res: Response, next: NextFunction) {
    const data = await this.jobApplicationService.getAllJobApplications();

    return res.status(StatusCodes.OK).json(data);
  }

  async getJobApplicationById(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    const data = await this.jobApplicationService.getJobApplicationById(id);

    return res.status(StatusCodes.OK).json(data);
  }

  async applyForJob(req: Request, res: Response, next: NextFunction) {
    const userId = Number(req.params.userId);
    const jobId = Number(req.params.jobId);
    const resume = req.body.resume;

    const data = await this.jobApplicationService.applyForJob(userId, jobId, resume);

    return res.status(StatusCodes.CREATED).json(data);
  }
}
