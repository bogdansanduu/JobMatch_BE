"use strict";
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
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
require("dotenv");
const dataSource_1 = require("../database/dataSource");
const user_entity_1 = require("../user/entities/user.entity");
const company_entity_1 = require("../company/entities/company.entity");
const Strategy = passport_jwt_1.default.Strategy;
const ExtractJwt = passport_jwt_1.default.ExtractJwt;
const userRepo = dataSource_1.dataSource.getRepository(user_entity_1.User);
const companyRepo = dataSource_1.dataSource.getRepository(company_entity_1.Company);
passport_1.default.use(new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET || 'access',
}, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    let user = null;
    let company = null;
    if (payload.userId) {
        user = yield userRepo.findOne({
            where: {
                id: payload.userId,
            },
        });
    }
    if (payload.companyId) {
        company = yield companyRepo.findOne({
            where: {
                id: payload.companyId,
            },
        });
    }
    if (!user && !company) {
        return done(new Error('Invalid token'), null);
    }
    if (user) {
        return done(null, user);
    }
    if (company) {
        return done(null, company);
    }
})));
//# sourceMappingURL=passport.js.map