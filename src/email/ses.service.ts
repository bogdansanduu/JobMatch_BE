import { SendTemplatedEmailCommand, SendTemplatedEmailCommandInput, SESClient } from '@aws-sdk/client-ses';
import { inject, injectable } from 'inversify';

import { JobApplicationService } from '../job-application/job-application.service';
import { COMPANY_INV, JOB_APPLICATION_INV, USER_INV } from '../common/utils/inversifyConstants';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import UserService from '../user/user.service';
import { CompanyService } from '../company/company.service';
import { getEnvVar } from '../common/utils/envConfig';

const sesRegion = getEnvVar<string>('SES_REGION', 'string');
const accessKey = getEnvVar<string>('ACCESS_KEY', 'string');
const secretAccessKey = getEnvVar<string>('SECRET_ACCESS_KEY', 'string');
const sesSenderEmail = getEnvVar<string>('SES_SENDER_EMAIL', 'string');

@injectable()
export class SESService {
  private readonly sesClient: SESClient;
  private readonly jobApplicationService: JobApplicationService;
  private readonly userService: UserService;
  private readonly companyService: CompanyService;

  constructor(
    @inject(JOB_APPLICATION_INV.JobApplicationService) jobApplicationService: JobApplicationService,

    @inject(USER_INV.UserService) userService: UserService,
    @inject(COMPANY_INV.CompanyService) companyService: CompanyService
  ) {
    this.sesClient = new SESClient({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
      },
      region: sesRegion,
    });
    this.jobApplicationService = jobApplicationService;
    this.userService = userService;
    this.companyService = companyService;
  }

  async sendApplicationEvaluatedEmail(jobApplicationId: number) {
    const jobApplication = await this.jobApplicationService.getJobApplicationById(jobApplicationId);

    if (!jobApplication) {
      throw new NotFoundException('Job Application not found');
    }

    const applicant = jobApplication.applicant;
    const job = jobApplication.job;
    const company = job.company;
    const redirectLink = `${getEnvVar<string>('APP_URL', 'string')}/user/application-review/${jobApplication.id}`;

    const params: SendTemplatedEmailCommandInput = {
      Source: `JobMatch <${sesSenderEmail}>`,
      Template: 'ApplicationReviewed',
      TemplateData: `{ "USER_NAME":"${applicant.firstName} ${applicant.lastName}", "JOB_TITLE": "${job.title}", "COMPANY_NAME": "${company.name}", "REDIRECT_LINK": "${redirectLink}" }`,
      Destination: {
        ToAddresses: ['sandubogdan2001@gmail.com'],
      },
    };

    const sendEmailCommand = new SendTemplatedEmailCommand(params);

    return await this.sesClient.send(sendEmailCommand);
  }

  async sendAccountPermissionChangedEmail(accountId: number, banned: boolean, isUser?: boolean, isCompany?: boolean) {
    const status = banned ? 'banned' : 'unbanned';

    if (isUser) {
      const userAccount = await this.userService.getUserById(accountId);

      const params: SendTemplatedEmailCommandInput = {
        Source: `JobMatch <${sesSenderEmail}>`,
        Template: 'AccountPermissionChange',
        TemplateData: `{ "USER_NAME": "${userAccount.firstName} ${userAccount.lastName}", "STATUS": "${status}" }`,
        Destination: {
          ToAddresses: ['sandubogdan2001@gmail.com'],
        },
      };

      const sendEmailCommand = new SendTemplatedEmailCommand(params);

      return await this.sesClient.send(sendEmailCommand);
    }

    if (isCompany) {
      const companyAccount = await this.companyService.getCompanyById(accountId);

      const params: SendTemplatedEmailCommandInput = {
        Source: `JobMatch <${sesSenderEmail}>`,
        Template: 'AccountPermissionChange',
        TemplateData: `{ "USER_NAME": "${companyAccount.name}", "STATUS": "${status}" }`,
        Destination: {
          ToAddresses: ['sandubogdan2001@gmail.com'],
        },
      };

      const sendEmailCommand = new SendTemplatedEmailCommand(params);

      return await this.sesClient.send(sendEmailCommand);
    }
  }
}
