"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobApplicationRouter = void 0;
const express_1 = __importDefault(require("express"));
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const centralizedContainer_1 = require("../common/centralizedContainer/centralizedContainer");
const jobApplicationRouter = express_1.default.Router();
exports.jobApplicationRouter = jobApplicationRouter;
const controller = centralizedContainer_1.centralizedContainer.get(inversifyConstants_1.JOB_APPLICATION_INV.JobApplicationController);
jobApplicationRouter.get('/all', controller.getAllJobApplications.bind(controller));
jobApplicationRouter.get('/user/:userId', controller.getAllJobApplicationsForUser.bind(controller));
jobApplicationRouter.get('/job/:jobId', controller.getAllJobApplicationsForJob.bind(controller));
jobApplicationRouter.get('/:id', controller.getJobApplicationById.bind(controller));
jobApplicationRouter.post('/apply/:userId/:jobId', controller.applyForJob.bind(controller));
jobApplicationRouter.put('/review/:id', controller.reviewApplication.bind(controller));
//# sourceMappingURL=job-application.router.js.map