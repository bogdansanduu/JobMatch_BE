"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobSavedRouter = void 0;
const express_1 = __importDefault(require("express"));
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const centralizedContainer_1 = require("../common/centralizedContainer/centralizedContainer");
const jobSavedRouter = express_1.default.Router();
exports.jobSavedRouter = jobSavedRouter;
const controller = centralizedContainer_1.centralizedContainer.get(inversifyConstants_1.JOB_SAVED_INV.JobSavedController);
jobSavedRouter.get('/all', controller.getAllSavedJobs.bind(controller));
jobSavedRouter.get('/user/:userId', controller.getAllSavedJobsForUser.bind(controller));
jobSavedRouter.post('/save', controller.saveJob.bind(controller));
jobSavedRouter.delete('/unsave', controller.unsaveJob.bind(controller));
//# sourceMappingURL=job-saved.router.js.map