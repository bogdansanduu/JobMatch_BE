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
exports.JobApplicationService = void 0;
const inversify_1 = require("inversify");
const job_application_repository_1 = require("./job-application.repository");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const job_service_1 = require("../job/job.service");
const user_service_1 = __importDefault(require("../user/user.service"));
const not_found_exception_1 = require("../common/exceptions/not-found.exception");
let JobApplicationService = class JobApplicationService {
    constructor(jobApplicationRepository, jobService, userService) {
        this.jobApplicationRepo = jobApplicationRepository;
        this.jobService = jobService;
        this.userService = userService;
    }
    getAllJobApplications() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.jobApplicationRepo.findAll();
        });
    }
    getJobApplicationById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.jobApplicationRepo.findOne(id);
        });
    }
    applyForJob(userId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield this.jobService.getJobById(jobId);
            const applicant = yield this.userService.getUserById(userId);
            if (!job || !applicant) {
                throw new not_found_exception_1.NotFoundException('Job or User not found');
            }
            return this.jobApplicationRepo.createJobApplication({
                job,
                applicant,
            });
        });
    }
    reviewApplication(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const application = yield this.jobApplicationRepo.findOne(id);
            if (!application) {
                throw new not_found_exception_1.NotFoundException('Application not found');
            }
            yield this.jobApplicationRepo.updateJobApplicationStatus(id, data);
            return this.jobApplicationRepo.findOne(id);
        });
    }
    getAllJobApplicationsForUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserById(userId);
            if (!user) {
                throw new not_found_exception_1.NotFoundException('User not found');
            }
            return this.jobApplicationRepo.findAllByUser(userId);
        });
    }
    getAllJobApplicationsForJob(jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield this.jobService.getJobById(jobId);
            if (!job) {
                throw new not_found_exception_1.NotFoundException('Job not found');
            }
            return this.jobApplicationRepo.findAllByJob(jobId);
        });
    }
    removeApplicationsByUserId(userId) {
        return this.jobApplicationRepo.deleteByUserId(userId);
    }
    removeApplicationsByCompanyId(companyId) {
        return this.jobApplicationRepo.deleteByCompanyId(companyId);
    }
};
exports.JobApplicationService = JobApplicationService;
exports.JobApplicationService = JobApplicationService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversifyConstants_1.JOB_APPLICATION_INV.JobApplicationRepository)),
    __param(1, (0, inversify_1.inject)(inversifyConstants_1.JOB_INV.JobService)),
    __param(2, (0, inversify_1.inject)(inversifyConstants_1.USER_INV.UserService)),
    __metadata("design:paramtypes", [job_application_repository_1.JobApplicationRepository,
        job_service_1.JobService,
        user_service_1.default])
], JobApplicationService);
//# sourceMappingURL=job-application.service.js.map