import express from 'express';
import { Container, ContainerModule } from 'inversify';

import { JOB_INV } from '../common/utils/inversifyConstants';
import { JobController } from './job.controller';
import catchErrors from '../common/utils/catchErrors';
import { JobRepository } from './job.repository';
import { JobService } from './job.service';
import { companyContainerModule } from '../company/company.router';
import { userContainerModule } from '../user/user.router';

const jobRouter = express.Router();

const container = new Container();

const jobContainerModule = new ContainerModule((bind) => {
  bind(JOB_INV.JobRepository).to(JobRepository);
  bind(JOB_INV.JobService).to(JobService);
  bind(JOB_INV.JobController).to(JobController);
});

container.load(jobContainerModule);
container.load(companyContainerModule);
container.load(userContainerModule);

const controller = container.get<JobController>(JOB_INV.JobController);

jobRouter.get('/all', catchErrors(controller.getAllJobs.bind(controller)));
jobRouter.get('/all-paginated', catchErrors(controller.getAllJobsPaginated.bind(controller)));
jobRouter.get('/all-company/:companyId', catchErrors(controller.getAllJobsByCompany.bind(controller)));
jobRouter.get('/:jobId', catchErrors(controller.getJobById.bind(controller)));

jobRouter.post('/', catchErrors(controller.createJob.bind(controller)));

//---RecSys---

jobRouter.post('/recSys', catchErrors(controller.addRecSysJobs.bind(controller)));

export { jobRouter, jobContainerModule };
