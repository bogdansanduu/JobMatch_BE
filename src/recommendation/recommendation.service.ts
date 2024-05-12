import { inject, injectable } from 'inversify';
import axios, { AxiosError } from 'axios';

import UserService from '../user/user.service';
import { CompanyService } from '../company/company.service';
import { JobService } from '../job/job.service';
import { COMPANY_INV, JOB_INV, USER_INV } from '../common/utils/inversifyConstants';
import process from 'process';
import { HttpException } from '../common/exceptions/http.exception';
import { GetRecommendationsValidation } from './dtos/get-recommendations.validation';

@injectable()
export class RecommendationService {
  private readonly userService: UserService;
  private readonly companyService: CompanyService;
  private readonly jobService: JobService;

  constructor(
    @inject(USER_INV.UserService)
    userService: UserService,
    @inject(COMPANY_INV.CompanyService)
    companyService: CompanyService,
    @inject(JOB_INV.JobService)
    jobService: JobService
  ) {
    this.userService = userService;
    this.companyService = companyService;
    this.jobService = jobService;
  }

  async populateRecommendations() {
    await this.userService.addRecSysUsers();
    await this.companyService.addRecSysCompanies();
    await this.jobService.addRecSysJobs();
  }

  async getRecommendations(recommendationInfo: GetRecommendationsValidation) {
    const url = `${process.env.FASTAPI_SERVER_URL}/getRecommendations` || 'http://localhost:8000/getRecommendations';
    const secretKey = process.env.SECRET_FASTAPI_SERVER || 'secret';

    try {
      const { data } = await axios.get(url, {
        headers: {
          'X-Secret-Key': secretKey,
        },
        data: recommendationInfo,
      });

      return data;
    } catch (error) {
      const axiosError = error as AxiosError;

      throw new HttpException(axiosError.message, axiosError.status || 500);
    }
  }
}
