"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobApplicationContainerModule = exports.jobApplicationRouter = void 0;
const express_1 = __importDefault(require("express"));
const inversify_1 = require("inversify");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const job_application_service_1 = require("./job-application.service");
const job_application_repository_1 = require("./job-application.repository");
const job_application_controller_1 = require("./job-application.controller");
const user_router_1 = require("../user/user.router");
const job_router_1 = require("../job/job.router");
const company_router_1 = require("../company/company.router");
const container = new inversify_1.Container();
const jobApplicationContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(inversifyConstants_1.JOB_APPLICATION_INV.JobApplicationRepository).to(job_application_repository_1.JobApplicationRepository);
    bind(inversifyConstants_1.JOB_APPLICATION_INV.JobApplicationService).to(job_application_service_1.JobApplicationService);
    bind(inversifyConstants_1.JOB_APPLICATION_INV.JobApplicationController).to(job_application_controller_1.JobApplicationController);
});
exports.jobApplicationContainerModule = jobApplicationContainerModule;
container.load(jobApplicationContainerModule);
container.load(user_router_1.userContainerModule);
container.load(job_router_1.jobContainerModule);
container.load(company_router_1.companyContainerModule);
const jobApplicationRouter = express_1.default.Router();
exports.jobApplicationRouter = jobApplicationRouter;
const controller = container.get(inversifyConstants_1.JOB_APPLICATION_INV.JobApplicationController);
jobApplicationRouter.get('/all', controller.getAllJobApplications.bind(controller));
jobApplicationRouter.get('/user/:userId', controller.getAllJobApplicationsForUser.bind(controller));
jobApplicationRouter.get('/job/:jobId', controller.getAllJobApplicationsForJob.bind(controller));
jobApplicationRouter.get('/:id', controller.getJobApplicationById.bind(controller));
jobApplicationRouter.post('/apply/:userId/:jobId', controller.applyForJob.bind(controller));
jobApplicationRouter.put('/review/:id', controller.reviewApplication.bind(controller));
//# sourceMappingURL=job-application.router.js.map