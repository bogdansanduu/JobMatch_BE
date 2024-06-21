"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyRouter = void 0;
const express_1 = __importDefault(require("express"));
const inversifyConstants_1 = require("../common/utils/inversifyConstants");
const catchErrors_1 = __importDefault(require("../common/utils/catchErrors"));
const centralizedContainer_1 = require("../common/centralizedContainer/centralizedContainer");
const companyRouter = express_1.default.Router();
exports.companyRouter = companyRouter;
const controller = centralizedContainer_1.centralizedContainer.get(inversifyConstants_1.COMPANY_INV.CompanyController);
companyRouter.get('/all', (0, catchErrors_1.default)(controller.getAllCompanies.bind(controller)));
companyRouter.get('/search', (0, catchErrors_1.default)(controller.searchByNameAndEmail.bind(controller)));
companyRouter.get('/:id', (0, catchErrors_1.default)(controller.getCompanyById.bind(controller)));
companyRouter.put('/ban/:id', (0, catchErrors_1.default)(controller.banCompany.bind(controller)));
companyRouter.post('/recSys', (0, catchErrors_1.default)(controller.addRecSysCompanies.bind(controller)));
//# sourceMappingURL=company.router.js.map