"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recommendationContainerModule = exports.recommendationRouter = void 0;
const express_1 = __importDefault(require("express"));
const inversify_1 = require("inversify");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const recommendation_controller_1 = require("./recommendation.controller");
const recommendation_service_1 = require("./recommendation.service");
const catchErrors_1 = __importDefault(require("../common/utils/catchErrors"));
const user_router_1 = require("../user/user.router");
const company_router_1 = require("../company/company.router");
const job_router_1 = require("../job/job.router");
const recommendationRouter = express_1.default.Router();
exports.recommendationRouter = recommendationRouter;
const container = new inversify_1.Container();
const recommendationContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(inversifyConstants_1.RECOMMENDATION_INV.RecommendationController).to(recommendation_controller_1.RecommendationController);
    bind(inversifyConstants_1.RECOMMENDATION_INV.RecommendationService).to(recommendation_service_1.RecommendationService);
});
exports.recommendationContainerModule = recommendationContainerModule;
container.load(recommendationContainerModule);
container.load(user_router_1.userContainerModule);
container.load(company_router_1.companyContainerModule);
container.load(job_router_1.jobContainerModule);
const controller = container.get(inversifyConstants_1.RECOMMENDATION_INV.RecommendationController);
recommendationRouter.post('/populate', (0, catchErrors_1.default)(controller.populateRecommendations.bind(controller)));
recommendationRouter.post('/get-recommendations', (0, catchErrors_1.default)(controller.getRecommendations.bind(controller)));
//# sourceMappingURL=recommendation.router.js.map