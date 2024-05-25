import express from 'express';
import { Container, ContainerModule } from 'inversify';

import { JOB_APPLICATION_INV } from '../common/utils/inversifyConstants';
import { JobApplicationService } from './job-application.service';
import { JobApplicationRepository } from './job-application.repository';
import { JobApplicationController } from './job-application.controller';
import { userContainerModule } from '../user/user.router';
import { jobContainerModule } from '../job/job.router';
import { companyContainerModule } from '../company/company.router';

const container = new Container();
const jobApplicationContainerModule = new ContainerModule((bind) => {
  bind(JOB_APPLICATION_INV.JobApplicationRepository).to(JobApplicationRepository);
  bind(JOB_APPLICATION_INV.JobApplicationService).to(JobApplicationService);
  bind(JOB_APPLICATION_INV.JobApplicationController).to(JobApplicationController);
});

container.load(jobApplicationContainerModule);
container.load(userContainerModule);
container.load(jobContainerModule);
container.load(companyContainerModule);

const jobApplicationRouter = express.Router();

const controller = container.get<JobApplicationController>(JOB_APPLICATION_INV.JobApplicationController);

jobApplicationRouter.get('/all', controller.getAllJobApplications.bind(controller));
jobApplicationRouter.get('/:id', controller.getJobApplicationById.bind(controller));

jobApplicationRouter.post('/apply/:userId/:jobId', controller.applyForJob.bind(controller));

export { jobApplicationRouter, jobApplicationContainerModule };
