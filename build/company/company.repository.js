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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRepository = void 0;
const inversify_1 = require("inversify");
const company_entity_1 = require("./entities/company.entity");
const typeorm_1 = require("typeorm");
const dataSource_1 = require("../database/dataSource");
let CompanyRepository = class CompanyRepository {
    constructor() {
        this.companyRepo = dataSource_1.dataSource.getRepository(company_entity_1.Company);
    }
    getCompanyById(id) {
        return this.companyRepo.findOne({
            where: {
                id,
            },
            relations: {
                owner: true,
                posts: true,
            },
        });
    }
    findAll() {
        return this.companyRepo.find({
            relations: {
                owner: true,
            },
        });
    }
    findByEmail(email) {
        return this.companyRepo.findOne({
            where: {
                email,
            },
            relations: {
                owner: true,
            },
        });
    }
    findByName(name) {
        return this.companyRepo.findOne({
            where: {
                name,
            },
            relations: {
                owner: true,
            },
        });
    }
    createCompany(companyData) {
        const company = this.companyRepo.create(companyData);
        return this.companyRepo.save(company);
    }
    searchByNameAndEmail(searchTerms) {
        return __awaiter(this, void 0, void 0, function* () {
            const whereConditions = searchTerms.map((searchTerm) => ({
                where: [{ name: (0, typeorm_1.ILike)(`%${searchTerm}%`) }, { email: (0, typeorm_1.ILike)(`%${searchTerm}%`) }],
            }));
            const combinedConditions = whereConditions.reduce((acc, condition) => {
                acc.push(...condition.where);
                return acc;
            }, []);
            return this.companyRepo.find({
                where: combinedConditions,
            });
        });
    }
};
CompanyRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], CompanyRepository);
exports.CompanyRepository = CompanyRepository;
//# sourceMappingURL=company.repository.js.map