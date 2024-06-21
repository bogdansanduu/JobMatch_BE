import express from 'express';

import { RECOMMENDATION_INV } from '../common/utils/inversifyConstants';
import { RecommendationController } from './recommendation.controller';
import catchErrors from '../common/utils/catchErrors';
import { centralizedContainer } from '../common/centralizedContainer/centralizedContainer';

const recommendationRouter = express.Router();

const controller = centralizedContainer.get<RecommendationController>(RECOMMENDATION_INV.RecommendationController);

recommendationRouter.post('/populate', catchErrors(controller.populateRecommendations.bind(controller)));
recommendationRouter.post('/get-recommendations', catchErrors(controller.getRecommendations.bind(controller)));

export { recommendationRouter };
