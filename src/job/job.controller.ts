import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';

import { JobService } from './job.service';
import { JOB_INV } from '../common/utils/inversifyConstants';
import { StatusCodes } from 'http-status-codes';
import { plainToInstance } from 'class-transformer';
import { JobResponseDto } from './dtos/job-response.dto';
import { validateBody } from '../common/utils/validateBody';
import { CreateJobValidation } from './dtos/create-job.validation';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { JwtAuth } from '../common/decorators/jwt-auth.decorator';
import { RequiresRoles } from '../common/decorators/requires-roles.decorator';
import { Roles } from '../common/constants/user.constants';

@injectable()
export class JobController {
  private readonly jobService: JobService;

  constructor(
    @inject(JOB_INV.JobService)
    jobService: JobService
  ) {
    this.jobService = jobService;
  }

  @JwtAuth()
  @RequiresRoles([Roles.ADMIN, Roles.USER, Roles.COMPANY, Roles.COMPANY_OWNER])
  async getAllJobs(req: Request, res: Response, next: NextFunction) {
    const data = await this.jobService.getAllJobs();

    //response logic

    const responseData = plainToInstance(JobResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  @JwtAuth()
  @RequiresRoles([Roles.ADMIN, Roles.USER, Roles.COMPANY, Roles.COMPANY_OWNER])
  async getJobById(req: Request, res: Response, next: NextFunction) {
    const jobId = Number(req.params.jobId);

    const data = await this.jobService.getJobById(jobId);

    //response logic

    const responseData = plainToInstance(JobResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  @JwtAuth()
  @RequiresRoles([Roles.ADMIN, Roles.USER, Roles.COMPANY, Roles.COMPANY_OWNER])
  async getAllJobsByCompany(req: Request, res: Response, next: NextFunction) {
    const companyId = Number(req.params.companyId);

    const data = await this.jobService.getAllJobsByCompany(companyId);

    //response logic

    const responseData = plainToInstance(JobResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  @JwtAuth()
  @RequiresRoles([Roles.ADMIN, Roles.USER, Roles.COMPANY, Roles.COMPANY_OWNER])
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

  @JwtAuth()
  @RequiresRoles([Roles.COMPANY])
  async createJob(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    //validate logic

    await validateBody(body, CreateJobValidation);

    const data = await this.jobService.createJob(body);

    //response logic

    const responseData = plainToInstance(JobResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.CREATED).json(responseData);
  }

  @JwtAuth()
  @RequiresRoles([Roles.ADMIN])
  async removeJob(req: Request, res: Response, next: NextFunction) {
    const jobId = Number(req.params.jobId);

    //validate logic

    if (!jobId) {
      throw new NotFoundException('Job not found');
    }

    await this.jobService.removeJob(jobId);

    return res.status(StatusCodes.OK).json({ message: 'Job removed successfully' });
  }

  //---RecSys---

  @JwtAuth()
  @RequiresRoles([Roles.ADMIN])
  async addRecSysJobs(req: Request, res: Response, next: NextFunction) {
    const data = await this.jobService.addRecSysJobs();

    const responseData = plainToInstance(JobResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.CREATED).json(responseData);
  }
}
