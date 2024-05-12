import express from 'express';
import { Container, ContainerModule } from 'inversify';

import { RECOMMENDATION_INV } from '../common/utils/inversifyConstants';
import { RecommendationController } from './recommendation.controller';
import { RecommendationService } from './recommendation.service';
import catchErrors from '../common/utils/catchErrors';
import { userContainerModule } from '../user/user.router';
import { companyContainerModule } from '../company/company.router';
import { jobContainerModule } from '../job/job.router';

const recommendationRouter = express.Router();

const container = new Container();

const recommendationContainerModule = new ContainerModule((bind) => {
  bind(RECOMMENDATION_INV.RecommendationController).to(RecommendationController);
  bind(RECOMMENDATION_INV.RecommendationService).to(RecommendationService);
});

container.load(recommendationContainerModule);
container.load(userContainerModule);
container.load(companyContainerModule);
container.load(jobContainerModule);

const controller = container.get<RecommendationController>(RECOMMENDATION_INV.RecommendationController);

recommendationRouter.post('/populate', catchErrors(controller.populateRecommendations.bind(controller)));
recommendationRouter.get('/get-recommendations', catchErrors(controller.getRecommendations.bind(controller)));

export { recommendationRouter, recommendationContainerModule };
