import express from 'express';

import { AWS_SES_INV } from '../common/utils/inversifyConstants';
import { SESController } from './ses.controller';
import { centralizedContainer } from '../common/centralizedContainer/centralizedContainer';

const sesRouter = express.Router();

const controller = centralizedContainer.get<SESController>(AWS_SES_INV.SESController);

sesRouter.post(
  '/send-application-evaluated-email/:jobApplicationId',
  controller.sendApplicationEvaluatedEmail.bind(controller)
);

export { sesRouter };
