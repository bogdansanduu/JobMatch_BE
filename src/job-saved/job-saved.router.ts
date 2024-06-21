import express from 'express';

import { JOB_SAVED_INV } from '../common/utils/inversifyConstants';

import { JobSavedController } from './job-saved.controller';
import { centralizedContainer } from '../common/centralizedContainer/centralizedContainer';

const jobSavedRouter = express.Router();

const controller = centralizedContainer.get<JobSavedController>(JOB_SAVED_INV.JobSavedController);

jobSavedRouter.get('/all', controller.getAllSavedJobs.bind(controller));
jobSavedRouter.get('/user/:userId', controller.getAllSavedJobsForUser.bind(controller));

jobSavedRouter.post('/save', controller.saveJob.bind(controller));

jobSavedRouter.delete('/unsave', controller.unsaveJob.bind(controller));

export { jobSavedRouter };
