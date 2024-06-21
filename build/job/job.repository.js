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
exports.JobRepository = void 0;
const typeorm_1 = require("typeorm");
const inversify_1 = require("inversify");
const job_entity_1 = require("./entities/job.entity");
const dataSource_1 = require("../database/dataSource");
let JobRepository = class JobRepository {
    constructor() {
        this.jobRepo = dataSource_1.dataSource.getRepository(job_entity_1.Job);
    }
    findAll() {
        return this.jobRepo.find({
            relations: {
                company: true,
                applications: {
                    job: true,
                    applicant: true,
                },
                saved: true,
            },
        });
    }
    findAllByCompany(companyId) {
        return this.jobRepo.find({
            where: {
                company: {
                    id: companyId,
                },
            },
            relations: {
                company: true,
                applications: {
                    job: true,
                    applicant: true,
                },
                saved: true,
            },
        });
    }
    count() {
        return this.jobRepo.count();
    }
    findAllPaginated(page, limit, searchTerm) {
        const query = {
            relations: {
                company: true,
                applications: {
                    job: true,
                    applicant: true,
                },
                saved: true,
            },
            skip: (page - 1) * limit,
            take: limit,
        };
        if (searchTerm) {
            query.where = [
                { title: (0, typeorm_1.Like)(`%${searchTerm}%`) },
                { description: (0, typeorm_1.Like)(`%${searchTerm}%`) },
                { company: { name: (0, typeorm_1.Like)(`%${searchTerm}%`) } },
            ];
        }
        return this.jobRepo.find(query);
    }
    findOne(id) {
        return this.jobRepo.findOne({
            where: {
                id,
            },
            relations: {
                company: true,
                applications: {
                    job: true,
                    applicant: true,
                },
                saved: true,
            },
        });
    }
    createJob(jobData) {
        const job = this.jobRepo.create(jobData);
        return this.jobRepo.save(job);
    }
    deleteByCompanyId(companyId) {
        return this.jobRepo.delete({
            company: {
                id: companyId,
            },
        });
    }
    delete(jobId) {
        return this.jobRepo.delete(jobId);
    }
};
exports.JobRepository = JobRepository;
exports.JobRepository = JobRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], JobRepository);
//# sourceMappingURL=job.repository.js.map