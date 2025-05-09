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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobApplicationRepository = void 0;
const inversify_1 = require("inversify");
const job_application_entity_1 = require("./entities/job-application.entity");
const dataSource_1 = require("../database/dataSource");
let JobApplicationRepository = class JobApplicationRepository {
    constructor() {
        this.jobApplicationRepo = dataSource_1.dataSource.getRepository(job_application_entity_1.JobApplication);
    }
    findAll() {
        return this.jobApplicationRepo.find({
            relations: {
                job: {
                    company: true,
                },
                applicant: true,
            },
        });
    }
    findAllByUser(userId) {
        return this.jobApplicationRepo.find({
            where: {
                applicant: {
                    id: userId,
                },
            },
            relations: {
                job: {
                    company: true,
                },
                applicant: true,
            },
        });
    }
    findAllByJob(jobId) {
        return this.jobApplicationRepo.find({
            where: {
                job: {
                    id: jobId,
                },
            },
            relations: {
                job: {
                    company: true,
                },
                applicant: true,
            },
        });
    }
    findOne(id) {
        return this.jobApplicationRepo.findOne({
            where: {
                id,
            },
            relations: {
                job: {
                    company: true,
                },
                applicant: true,
            },
        });
    }
    createJobApplication(jobApplicationData) {
        const jobApplication = this.jobApplicationRepo.create(jobApplicationData);
        return this.jobApplicationRepo.save(jobApplication);
    }
    updateJobApplicationStatus(id, data) {
        return this.jobApplicationRepo.update(id, data);
    }
    deleteByUserId(userId) {
        return this.jobApplicationRepo.delete({
            applicant: {
                id: userId,
            },
        });
    }
    deleteByCompanyId(companyId) {
        return this.jobApplicationRepo.delete({
            job: {
                company: {
                    id: companyId,
                },
            },
        });
    }
};
exports.JobApplicationRepository = JobApplicationRepository;
exports.JobApplicationRepository = JobApplicationRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], JobApplicationRepository);
//# sourceMappingURL=job-application.repository.js.map