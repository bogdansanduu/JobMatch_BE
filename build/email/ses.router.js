"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sesRouter = void 0;
const express_1 = __importDefault(require("express"));
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const centralizedContainer_1 = require("../common/centralizedContainer/centralizedContainer");
const sesRouter = express_1.default.Router();
exports.sesRouter = sesRouter;
const controller = centralizedContainer_1.centralizedContainer.get(inversifyConstants_1.AWS_SES_INV.SESController);
sesRouter.post('/send-application-evaluated-email/:jobApplicationId', controller.sendApplicationEvaluatedEmail.bind(controller));
//# sourceMappingURL=ses.router.js.map