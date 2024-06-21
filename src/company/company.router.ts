import express from 'express';

import { COMPANY_INV } from '../common/utils/inversifyConstants';

import { CompanyController } from './company.controller';
import catchErrors from '../common/utils/catchErrors';
import { centralizedContainer } from '../common/centralizedContainer/centralizedContainer';

const companyRouter = express.Router();

const controller = centralizedContainer.get<CompanyController>(COMPANY_INV.CompanyController);

companyRouter.get('/all', catchErrors(controller.getAllCompanies.bind(controller)));
companyRouter.get('/search', catchErrors(controller.searchByNameAndEmail.bind(controller)));
companyRouter.get('/:id', catchErrors(controller.getCompanyById.bind(controller)));

companyRouter.put('/ban/:id', catchErrors(controller.banCompany.bind(controller)));

//---RecSys---

companyRouter.post('/recSys', catchErrors(controller.addRecSysCompanies.bind(controller)));

export { companyRouter };
