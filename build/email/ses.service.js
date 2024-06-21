"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SESService = void 0;
const client_ses_1 = require("@aws-sdk/client-ses");
const inversify_1 = require("inversify");
const job_application_service_1 = require("../job-application/job-application.service");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const not_found_exception_1 = require("../common/exceptions/not-found.exception");
const user_service_1 = __importDefault(require("../user/user.service"));
const company_service_1 = require("../company/company.service");
const envConfig_1 = require("../common/utils/envConfig");
const sesRegion = (0, envConfig_1.getEnvVar)('SES_REGION', 'string');
const accessKey = (0, envConfig_1.getEnvVar)('ACCESS_KEY', 'string');
const secretAccessKey = (0, envConfig_1.getEnvVar)('SECRET_ACCESS_KEY', 'string');
const sesSenderEmail = (0, envConfig_1.getEnvVar)('SES_SENDER_EMAIL', 'string');
let SESService = class SESService {
    constructor(jobApplicationService, userService, companyService) {
        this.sesClient = new client_ses_1.SESClient({
            credentials: {
                accessKeyId: accessKey,
                secretAccessKey: secretAccessKey,
            },
            region: sesRegion,
        });
        this.jobApplicationService = jobApplicationService;
        this.userService = userService;
        this.companyService = companyService;
    }
    sendApplicationEvaluatedEmail(jobApplicationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobApplication = yield this.jobApplicationService.getJobApplicationById(jobApplicationId);
            if (!jobApplication) {
                throw new not_found_exception_1.NotFoundException('Job Application not found');
            }
            const applicant = jobApplication.applicant;
            const job = jobApplication.job;
            const company = job.company;
            const redirectLink = `http://localhost:3000/user/application-review/${jobApplication.id}`;
            const params = {
                Source: `JobMatch <${sesSenderEmail}>`,
                Template: 'ApplicationReviewed',
                TemplateData: `{ "USER_NAME":"${applicant.firstName} ${applicant.lastName}", "JOB_TITLE": "${job.title}", "COMPANY_NAME": "${company.name}", "REDIRECT_LINK": "${redirectLink}" }`,
                Destination: {
                    ToAddresses: ['sandubogdan2001@gmail.com'],
                },
            };
            const sendEmailCommand = new client_ses_1.SendTemplatedEmailCommand(params);
            return yield this.sesClient.send(sendEmailCommand);
        });
    }
    sendAccountPermissionChangedEmail(accountId, banned, isUser, isCompany) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = banned ? 'banned' : 'unbanned';
            if (isUser) {
                const userAccount = yield this.userService.getUserById(accountId);
                const params = {
                    Source: `JobMatch <${sesSenderEmail}>`,
                    Template: 'AccountPermissionChange',
                    TemplateData: `{ "USER_NAME": "${userAccount.firstName} ${userAccount.lastName}", "STATUS": "${status}" }`,
                    Destination: {
                        ToAddresses: ['sandubogdan2001@gmail.com'],
                    },
                };
                const sendEmailCommand = new client_ses_1.SendTemplatedEmailCommand(params);
                return yield this.sesClient.send(sendEmailCommand);
            }
            if (isCompany) {
                const companyAccount = yield this.companyService.getCompanyById(accountId);
                const params = {
                    Source: `JobMatch <${sesSenderEmail}>`,
                    Template: 'AccountPermissionChange',
                    TemplateData: `{ "USER_NAME": "${companyAccount.name}", "STATUS": "${status}" }`,
                    Destination: {
                        ToAddresses: ['sandubogdan2001@gmail.com'],
                    },
                };
                const sendEmailCommand = new client_ses_1.SendTemplatedEmailCommand(params);
                return yield this.sesClient.send(sendEmailCommand);
            }
        });
    }
};
exports.SESService = SESService;
exports.SESService = SESService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversifyConstants_1.JOB_APPLICATION_INV.JobApplicationService)),
    __param(1, (0, inversify_1.inject)(inversifyConstants_1.USER_INV.UserService)),
    __param(2, (0, inversify_1.inject)(inversifyConstants_1.COMPANY_INV.CompanyService)),
    __metadata("design:paramtypes", [job_application_service_1.JobApplicationService,
        user_service_1.default,
        company_service_1.CompanyService])
], SESService);
//# sourceMappingURL=ses.service.js.map