import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';

import { JobService } from './job.service';
import { JOB_INV } from '../common/utils/inversifyConstants';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class JobController {
  private readonly jobService: JobService;

  constructor(
    @inject(JOB_INV.JobService)
    jobService: JobService
  ) {
    this.jobService = jobService;
  }

  async getAllJobs(req: Request, res: Response, next: NextFunction) {
    const data = await this.jobService.getAllJobs();

    //response logic

    return res.status(StatusCodes.OK).json(data);
  }

  //---RecSys---

  async addRecSysJobs(req: Request, res: Response, next: NextFunction) {
    const recSysJobs = await this.jobService.addRecSysJobs();

    //TODO create response DTO
    //response logic

    return res.status(StatusCodes.CREATED).json(recSysJobs);
  }
}
