import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { JobSavedService } from './job-saved.service';
import { JOB_SAVED_INV } from '../common/utils/inversifyConstants';
import { JwtAuth } from '../common/decorators/jwt-auth.decorator';
import { RequiresRoles } from '../common/decorators/requires-roles.decorator';
import { Roles } from '../common/constants/user.constants';

@injectable()
export class JobSavedController {
  private readonly jobSavedService: JobSavedService;

  constructor(@inject(JOB_SAVED_INV.JobSavedService) jobSavedService: JobSavedService) {
    this.jobSavedService = jobSavedService;
  }

  @JwtAuth()
  @RequiresRoles([Roles.ADMIN, Roles.USER, Roles.COMPANY, Roles.COMPANY_OWNER])
  async getAllSavedJobs(req: Request, res: Response, next: NextFunction) {
    const data = await this.jobSavedService.getAllSavedJobs();

    return res.status(StatusCodes.OK).json(data);
  }

  @JwtAuth()
  @RequiresRoles([Roles.ADMIN, Roles.USER, Roles.COMPANY, Roles.COMPANY_OWNER])
  async getAllSavedJobsForUser(req: Request, res: Response, next: NextFunction) {
    const userId = Number(req.params.userId);

    const data = await this.jobSavedService.getAllSavedJobsForUser(userId);

    return res.status(StatusCodes.OK).json(data);
  }

  @JwtAuth()
  @RequiresRoles([Roles.USER, Roles.COMPANY_OWNER])
  async saveJob(req: Request, res: Response, next: NextFunction) {
    const userId = Number(req.body.userId);
    const jobId = Number(req.body.jobId);

    const data = await this.jobSavedService.saveJob(userId, jobId);

    return res.status(StatusCodes.CREATED).json(data);
  }

  @JwtAuth()
  @RequiresRoles([Roles.USER, Roles.COMPANY_OWNER])
  async unsaveJob(req: Request, res: Response, next: NextFunction) {
    const userId = Number(req.body.userId);
    const jobId = Number(req.body.jobId);

    await this.jobSavedService.unsaveJob(userId, jobId);

    return res.status(StatusCodes.OK).json({ jobId });
  }
}
