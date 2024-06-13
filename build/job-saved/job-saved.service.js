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
exports.JobSavedService = void 0;
const inversify_1 = require("inversify");
const job_saved_repository_1 = require("./job-saved.repository");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const job_service_1 = require("../job/job.service");
const user_service_1 = __importDefault(require("../user/user.service"));
const not_found_exception_1 = require("../common/exceptions/not-found.exception");
let JobSavedService = class JobSavedService {
    constructor(jobSavedRepo, jobService, userService) {
        this.jobSavedRepo = jobSavedRepo;
        this.jobService = jobService;
        this.userService = userService;
    }
    getAllSavedJobs() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.jobSavedRepo.findAll();
        });
    }
    saveJob(userId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield this.jobService.getJobById(jobId);
            const user = yield this.userService.getUserById(userId);
            if (!job || !user) {
                throw new not_found_exception_1.NotFoundException('Job or User not found');
            }
            return this.jobSavedRepo.saveJob({ job, user });
        });
    }
    unsaveJob(userId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield this.jobService.getJobById(jobId);
            const user = yield this.userService.getUserById(userId);
            if (!job || !user) {
                throw new not_found_exception_1.NotFoundException('Job or User not found');
            }
            yield this.jobSavedRepo.deleteSavedJob({ job, user });
        });
    }
    getAllSavedJobsForUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserById(userId);
            if (!user) {
                throw new not_found_exception_1.NotFoundException('User not found');
            }
            return this.jobSavedRepo.findAllByUser(userId);
        });
    }
};
JobSavedService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversifyConstants_1.JOB_SAVED_INV.JobSavedRepository)),
    __param(1, (0, inversify_1.inject)(inversifyConstants_1.JOB_INV.JobService)),
    __param(2, (0, inversify_1.inject)(inversifyConstants_1.USER_INV.UserService)),
    __metadata("design:paramtypes", [job_saved_repository_1.JobSavedRepository,
        job_service_1.JobService,
        user_service_1.default])
], JobSavedService);
exports.JobSavedService = JobSavedService;
//# sourceMappingURL=job-saved.service.js.map