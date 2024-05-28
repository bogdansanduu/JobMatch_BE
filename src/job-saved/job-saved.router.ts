import express from 'express';
import { Container, ContainerModule } from 'inversify';

import { JOB_SAVED_INV } from '../common/utils/inversifyConstants';
import { JobSavedRepository } from './job-saved.repository';
import { JobSavedService } from './job-saved.service';
import { JobSavedController } from './job-saved.controller';
import { userContainerModule } from '../user/user.router';
import { jobContainerModule } from '../job/job.router';
import { companyContainerModule } from '../company/company.router';

const container = new Container();

const jobSavedContainerModule = new ContainerModule((bind) => {
  bind(JOB_SAVED_INV.JobSavedRepository).to(JobSavedRepository);
  bind(JOB_SAVED_INV.JobSavedService).to(JobSavedService);
  bind(JOB_SAVED_INV.JobSavedController).to(JobSavedController);
});

container.load(jobSavedContainerModule);
container.load(userContainerModule);
container.load(jobContainerModule);
container.load(companyContainerModule);
const jobSavedRouter = express.Router();

const controller = container.get<JobSavedController>(JOB_SAVED_INV.JobSavedController);

jobSavedRouter.get('/all', controller.getAllSavedJobs.bind(controller));
jobSavedRouter.get('/user/:userId', controller.getAllSavedJobsForUser.bind(controller));

jobSavedRouter.post('/save', controller.saveJob.bind(controller));

jobSavedRouter.delete('/unsave', controller.unsaveJob.bind(controller));

export { jobSavedRouter, jobSavedContainerModule };
