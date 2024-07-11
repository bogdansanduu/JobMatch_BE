import express from 'express';

import { JOB_INV } from '../common/utils/inversifyConstants';
import { JobController } from './job.controller';
import catchErrors from '../common/utils/catchErrors';
import { centralizedContainer } from '../common/centralizedContainer/centralizedContainer';

const jobRouter = express.Router();

const controller = centralizedContainer.get<JobController>(JOB_INV.JobController);

jobRouter.get('/all', catchErrors(controller.getAllJobs.bind(controller)));
jobRouter.get('/all-paginated', catchErrors(controller.getAllJobsPaginated.bind(controller)));
jobRouter.get('/all-company/:companyId', catchErrors(controller.getAllJobsByCompany.bind(controller)));
jobRouter.get(
  '/all-company-paginated/:companyId',
  catchErrors(controller.getAllJobsByCompanyPaginated.bind(controller))
);
jobRouter.get('/:jobId', catchErrors(controller.getJobById.bind(controller)));

jobRouter.post('/', catchErrors(controller.createJob.bind(controller)));

jobRouter.delete('/:jobId', catchErrors(controller.removeJob.bind(controller)));

//---RecSys---

jobRouter.post('/recSys', catchErrors(controller.addRecSysJobs.bind(controller)));

export { jobRouter };
