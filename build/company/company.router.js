"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyContainerModule = exports.companyRouter = void 0;
const express_1 = __importDefault(require("express"));
const inversify_1 = require("inversify");
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const company_repository_1 = require("./company.repository");
const company_service_1 = require("./company.service");
const company_controller_1 = require("./company.controller");
const user_router_1 = require("../user/user.router");
const catchErrors_1 = __importDefault(require("../common/utils/catchErrors"));
const companyRouter = express_1.default.Router();
exports.companyRouter = companyRouter;
const container = new inversify_1.Container();
const companyContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(inversifyConstants_1.COMPANY_INV.CompanyRepository).to(company_repository_1.CompanyRepository);
    bind(inversifyConstants_1.COMPANY_INV.CompanyService).to(company_service_1.CompanyService);
    bind(inversifyConstants_1.COMPANY_INV.CompanyController).to(company_controller_1.CompanyController);
});
exports.companyContainerModule = companyContainerModule;
container.load(companyContainerModule);
container.load(user_router_1.userContainerModule);
const controller = container.get(inversifyConstants_1.COMPANY_INV.CompanyController);
companyRouter.get('/all', (0, catchErrors_1.default)(controller.getAllCompanies.bind(controller)));
companyRouter.get('/search', (0, catchErrors_1.default)(controller.searchByNameAndEmail.bind(controller)));
companyRouter.get('/:id', (0, catchErrors_1.default)(controller.getCompanyById.bind(controller)));
companyRouter.post('/recSys', (0, catchErrors_1.default)(controller.addRecSysCompanies.bind(controller)));
//# sourceMappingURL=company.router.js.map