import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';

import { JobService } from './job.service';
import { JOB_INV } from '../common/utils/inversifyConstants';
import { StatusCodes } from 'http-status-codes';
import { plainToInstance } from 'class-transformer';
import { JobResponseDto } from './dtos/job-response.dto';

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

    const responseData = plainToInstance(JobResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  async getAllJobsPaginated(req: Request, res: Response, next: NextFunction) {
    //extract page and limit
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const searchTerm = req.query.searchTerm as string;

    const jobsPaginated = await this.jobService.getAllJobsPaginated(page, limit, searchTerm);

    //response logic

    const responseData = plainToInstance(JobResponseDto, jobsPaginated.data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json({
      ...jobsPaginated,
      data: responseData,
    });
  }

  //---RecSys---

  async addRecSysJobs(req: Request, res: Response, next: NextFunction) {
    const data = await this.jobService.addRecSysJobs();

    const responseData = plainToInstance(JobResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.CREATED).json(responseData);
  }
}
