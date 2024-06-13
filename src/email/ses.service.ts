import { SendTemplatedEmailCommand, SendTemplatedEmailCommandInput, SESClient } from '@aws-sdk/client-ses';
import { inject, injectable } from 'inversify';

import { JobApplicationService } from '../job-application/job-application.service';
import { JOB_APPLICATION_INV } from '../common/utils/inversifyConstants';
import { NotFoundException } from '../common/exceptions/not-found.exception';

const sesRegion = process.env.SES_REGION || 'test';
const accessKey = process.env.ACCESS_KEY || 'test';
const secretAccessKey = process.env.SECRET_ACCESS_KEY || 'test';
const sesSenderEmail = process.env.SES_SENDER_EMAIL || 'test';

@injectable()
export class SESService {
  private readonly sesClient: SESClient;
  private readonly jobApplicationService: JobApplicationService;

  constructor(@inject(JOB_APPLICATION_INV.JobApplicationService) jobApplicationService: JobApplicationService) {
    this.sesClient = new SESClient({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
      },
      region: sesRegion,
    });
    this.jobApplicationService = jobApplicationService;
  }

  async sendApplicationEvaluatedEmail(jobApplicationId: number) {
    const jobApplication = await this.jobApplicationService.getJobApplicationById(jobApplicationId);

    if (!jobApplication) {
      throw new NotFoundException('Job Application not found');
    }

    const applicant = jobApplication.applicant;
    const job = jobApplication.job;
    const company = job.company;
    const redirectLink = `http://localhost:3000/user/application-review/${jobApplication.id}`;

    // Source: `JobMatch <${sesSenderEmail}>`,

    const params: SendTemplatedEmailCommandInput = {
      Source: `JobMatch <${sesSenderEmail}>`,
      Template: 'ApplicationReviewed',
      TemplateData: `{ "USER_NAME":"${applicant.firstName} ${applicant.lastName}", "JOB_TITLE": "${job.title}", "COMPANY_NAME": "${company.name}", "REDIRECT_LINK": "${redirectLink}" }`,
      Destination: {
        ToAddresses: ['sandubogdan2001@gmail.com'],
      },
    };

    console.log(params);

    const sendEmailCommand = new SendTemplatedEmailCommand(params);

    return await this.sesClient.send(sendEmailCommand);
  }
}
