"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailContainerModule = exports.sesRouter = void 0;
const express_1 = __importDefault(require("express"));
const inversify_1 = require("inversify");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const ses_service_1 = require("./ses.service");
const ses_controller_1 = require("./ses.controller");
const job_application_router_1 = require("../job-application/job-application.router");
const user_router_1 = require("../user/user.router");
const job_router_1 = require("../job/job.router");
const company_router_1 = require("../company/company.router");
const container = new inversify_1.Container();
const emailContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(inversifyConstants_1.AWS_SES_INV.SESService).to(ses_service_1.SESService);
    bind(inversifyConstants_1.AWS_SES_INV.SESController).to(ses_controller_1.SESController);
});
exports.emailContainerModule = emailContainerModule;
container.load(emailContainerModule);
container.load(job_application_router_1.jobApplicationContainerModule);
container.load(user_router_1.userContainerModule);
container.load(job_router_1.jobContainerModule);
container.load(company_router_1.companyContainerModule);
const sesRouter = express_1.default.Router();
exports.sesRouter = sesRouter;
const controller = container.get(inversifyConstants_1.AWS_SES_INV.SESController);
sesRouter.post('/send-application-evaluated-email/:jobApplicationId', controller.sendApplicationEvaluatedEmail.bind(controller));
//# sourceMappingURL=ses.router.js.map