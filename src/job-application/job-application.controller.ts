import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { plainToInstance } from 'class-transformer';

import { JobApplicationService } from './job-application.service';
import { JOB_APPLICATION_INV } from '../common/utils/inversifyConstants';
import { JobApplicationResponseDto } from './dtos/job-application-response.dto';
import { validateBody } from '../common/utils/validateBody';
import { ReviewApplicationValidation } from './dtos/review-application.validation';

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

    //response logic

    const responseData = plainToInstance(JobApplicationResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  async getJobApplicationById(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    const data = await this.jobApplicationService.getJobApplicationById(id);

    //response logic

    const responseData = plainToInstance(JobApplicationResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  async getAllJobApplicationsForUser(req: Request, res: Response, next: NextFunction) {
    const userId = Number(req.params.userId);

    const data = await this.jobApplicationService.getAllJobApplicationsForUser(userId);

    //response logic

    const responseData = plainToInstance(JobApplicationResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  async getAllJobApplicationsForJob(req: Request, res: Response, next: NextFunction) {
    const jobId = Number(req.params.jobId);

    const data = await this.jobApplicationService.getAllJobApplicationsForJob(jobId);

    //response logic

    const responseData = plainToInstance(JobApplicationResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  async applyForJob(req: Request, res: Response, next: NextFunction) {
    const userId = Number(req.params.userId);
    const jobId = Number(req.params.jobId);

    const data = await this.jobApplicationService.applyForJob(userId, jobId);

    //response logic

    const responseData = plainToInstance(JobApplicationResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.CREATED).json(responseData);
  }

  async reviewApplication(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    const body = req.body;

    //validate logic

    await validateBody(body, ReviewApplicationValidation);

    const data = await this.jobApplicationService.reviewApplication(id, body);

    //response logic

    const responseData = plainToInstance(JobApplicationResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }
}
