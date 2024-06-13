"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobContainerModule = exports.jobRouter = void 0;
const express_1 = __importDefault(require("express"));
const inversify_1 = require("inversify");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const job_controller_1 = require("./job.controller");
const catchErrors_1 = __importDefault(require("../common/utils/catchErrors"));
const job_repository_1 = require("./job.repository");
const job_service_1 = require("./job.service");
const company_router_1 = require("../company/company.router");
const user_router_1 = require("../user/user.router");
const jobRouter = express_1.default.Router();
exports.jobRouter = jobRouter;
const container = new inversify_1.Container();
const jobContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(inversifyConstants_1.JOB_INV.JobRepository).to(job_repository_1.JobRepository);
    bind(inversifyConstants_1.JOB_INV.JobService).to(job_service_1.JobService);
    bind(inversifyConstants_1.JOB_INV.JobController).to(job_controller_1.JobController);
});
exports.jobContainerModule = jobContainerModule;
container.load(jobContainerModule);
container.load(company_router_1.companyContainerModule);
container.load(user_router_1.userContainerModule);
const controller = container.get(inversifyConstants_1.JOB_INV.JobController);
jobRouter.get('/all', (0, catchErrors_1.default)(controller.getAllJobs.bind(controller)));
jobRouter.get('/all-paginated', (0, catchErrors_1.default)(controller.getAllJobsPaginated.bind(controller)));
jobRouter.get('/all-company/:companyId', (0, catchErrors_1.default)(controller.getAllJobsByCompany.bind(controller)));
jobRouter.get('/:jobId', (0, catchErrors_1.default)(controller.getJobById.bind(controller)));
jobRouter.post('/', (0, catchErrors_1.default)(controller.createJob.bind(controller)));
jobRouter.post('/recSys', (0, catchErrors_1.default)(controller.addRecSysJobs.bind(controller)));
//# sourceMappingURL=job.router.js.map