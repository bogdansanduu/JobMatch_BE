import express from 'express';
import { Container, ContainerModule } from 'inversify';

import { AWS_SES_INV } from '../common/utils/inversifyConstants';
import { SESService } from './ses.service';
import { SESController } from './ses.controller';
import { jobApplicationContainerModule } from '../job-application/job-application.router';
import { userContainerModule } from '../user/user.router';
import { jobContainerModule } from '../job/job.router';
import { companyContainerModule } from '../company/company.router';

const container = new Container();

const emailContainerModule = new ContainerModule((bind) => {
  bind(AWS_SES_INV.SESService).to(SESService);
  bind(AWS_SES_INV.SESController).to(SESController);
});

container.load(emailContainerModule);
container.load(jobApplicationContainerModule);
container.load(userContainerModule);
container.load(jobContainerModule);
container.load(companyContainerModule);

const sesRouter = express.Router();

const controller = container.get<SESController>(AWS_SES_INV.SESController);

sesRouter.post(
  '/send-application-evaluated-email/:jobApplicationId',
  controller.sendApplicationEvaluatedEmail.bind(controller)
);

export { sesRouter, emailContainerModule };
