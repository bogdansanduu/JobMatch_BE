import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { JobSavedService } from './job-saved.service';
import { JOB_SAVED_INV } from '../common/utils/inversifyConstants';

@injectable()
export class JobSavedController {
  private readonly jobSavedService: JobSavedService;

  constructor(@inject(JOB_SAVED_INV.JobSavedService) jobSavedService: JobSavedService) {
    this.jobSavedService = jobSavedService;
  }

  async getAllSavedJobs(req: Request, res: Response, next: NextFunction) {
    const data = await this.jobSavedService.getAllSavedJobs();

    return res.status(StatusCodes.OK).json(data);
  }

  async getAllSavedJobsForUser(req: Request, res: Response, next: NextFunction) {
    const userId = Number(req.params.userId);

    const data = await this.jobSavedService.getAllSavedJobsForUser(userId);

    return res.status(StatusCodes.OK).json(data);
  }

  async saveJob(req: Request, res: Response, next: NextFunction) {
    const userId = Number(req.body.userId);
    const jobId = Number(req.body.jobId);

    const data = await this.jobSavedService.saveJob(userId, jobId);

    return res.status(StatusCodes.CREATED).json(data);
  }

  async unsaveJob(req: Request, res: Response, next: NextFunction) {
    const userId = Number(req.body.userId);
    const jobId = Number(req.body.jobId);

    await this.jobSavedService.unsaveJob(userId, jobId);

    return res.status(StatusCodes.OK).json({ jobId });
  }
}
