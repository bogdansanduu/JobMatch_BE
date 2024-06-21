import express from 'express';

import { JOB_APPLICATION_INV } from '../common/utils/inversifyConstants';

import { JobApplicationController } from './job-application.controller';
import { centralizedContainer } from '../common/centralizedContainer/centralizedContainer';

const jobApplicationRouter = express.Router();

const controller = centralizedContainer.get<JobApplicationController>(JOB_APPLICATION_INV.JobApplicationController);

jobApplicationRouter.get('/all', controller.getAllJobApplications.bind(controller));
jobApplicationRouter.get('/user/:userId', controller.getAllJobApplicationsForUser.bind(controller));
jobApplicationRouter.get('/job/:jobId', controller.getAllJobApplicationsForJob.bind(controller));
jobApplicationRouter.get('/:id', controller.getJobApplicationById.bind(controller));

jobApplicationRouter.post('/apply/:userId/:jobId', controller.applyForJob.bind(controller));

jobApplicationRouter.put('/review/:id', controller.reviewApplication.bind(controller));

export { jobApplicationRouter };
