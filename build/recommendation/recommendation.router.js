"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recommendationRouter = void 0;
const express_1 = __importDefault(require("express"));
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const catchErrors_1 = __importDefault(require("../common/utils/catchErrors"));
const centralizedContainer_1 = require("../common/centralizedContainer/centralizedContainer");
const recommendationRouter = express_1.default.Router();
exports.recommendationRouter = recommendationRouter;
const controller = centralizedContainer_1.centralizedContainer.get(inversifyConstants_1.RECOMMENDATION_INV.RecommendationController);
recommendationRouter.post('/populate', (0, catchErrors_1.default)(controller.populateRecommendations.bind(controller)));
recommendationRouter.post('/get-recommendations', (0, catchErrors_1.default)(controller.getRecommendations.bind(controller)));
//# sourceMappingURL=recommendation.router.js.map