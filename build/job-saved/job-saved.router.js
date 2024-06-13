"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobSavedContainerModule = exports.jobSavedRouter = void 0;
const express_1 = __importDefault(require("express"));
const inversify_1 = require("inversify");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const job_saved_repository_1 = require("./job-saved.repository");
const job_saved_service_1 = require("./job-saved.service");
const job_saved_controller_1 = require("./job-saved.controller");
const user_router_1 = require("../user/user.router");
const job_router_1 = require("../job/job.router");
const company_router_1 = require("../company/company.router");
const container = new inversify_1.Container();
const jobSavedContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(inversifyConstants_1.JOB_SAVED_INV.JobSavedRepository).to(job_saved_repository_1.JobSavedRepository);
    bind(inversifyConstants_1.JOB_SAVED_INV.JobSavedService).to(job_saved_service_1.JobSavedService);
    bind(inversifyConstants_1.JOB_SAVED_INV.JobSavedController).to(job_saved_controller_1.JobSavedController);
});
exports.jobSavedContainerModule = jobSavedContainerModule;
container.load(jobSavedContainerModule);
container.load(user_router_1.userContainerModule);
container.load(job_router_1.jobContainerModule);
container.load(company_router_1.companyContainerModule);
const jobSavedRouter = express_1.default.Router();
exports.jobSavedRouter = jobSavedRouter;
const controller = container.get(inversifyConstants_1.JOB_SAVED_INV.JobSavedController);
jobSavedRouter.get('/all', controller.getAllSavedJobs.bind(controller));
jobSavedRouter.get('/user/:userId', controller.getAllSavedJobsForUser.bind(controller));
jobSavedRouter.post('/save', controller.saveJob.bind(controller));
jobSavedRouter.delete('/unsave', controller.unsaveJob.bind(controller));
//# sourceMappingURL=job-saved.router.js.map