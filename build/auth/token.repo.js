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
exports.TokenRepository = void 0;
const inversify_1 = require("inversify");
const token_entity_1 = require("./entities/token.entity");
const dataSource_1 = require("../database/dataSource");
let TokenRepository = class TokenRepository {
    constructor() {
        this.tokenRepo = dataSource_1.dataSource.getRepository(token_entity_1.Token);
    }
    createToken(tokenData) {
        const token = this.tokenRepo.create(tokenData);
        return this.tokenRepo.save(token);
    }
    createTokenCompany(tokenData) {
        const token = this.tokenRepo.create(tokenData);
        return this.tokenRepo.save(token);
    }
    deleteTokensByUser(user) {
        return this.tokenRepo.delete({
            user,
        });
    }
    deleteTokensByCompany(company) {
        return this.tokenRepo.delete({
            company,
        });
    }
    deleteTokenByName(refreshToken) {
        return this.tokenRepo.delete({
            refreshToken,
        });
    }
    getTokenByName(refreshToken) {
        return this.tokenRepo.findOne({
            where: {
                refreshToken,
            },
            relations: {
                user: true,
                company: true,
            },
        });
    }
};
TokenRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], TokenRepository);
exports.TokenRepository = TokenRepository;
//# sourceMappingURL=token.repo.js.map