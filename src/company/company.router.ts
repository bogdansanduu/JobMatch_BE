import express from 'express';
import { Container, ContainerModule } from 'inversify';

import { COMPANY_INV } from '../common/utils/inversifyConstants';
import { CompanyRepository } from './company.repository';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { userContainerModule } from '../user/user.router';
import catchErrors from '../common/utils/catchErrors';

const companyRouter = express.Router();

const container = new Container();

const companyContainerModule = new ContainerModule((bind) => {
  bind(COMPANY_INV.CompanyRepository).to(CompanyRepository);
  bind(COMPANY_INV.CompanyService).to(CompanyService);
  bind(COMPANY_INV.CompanyController).to(CompanyController);
});

container.load(companyContainerModule);
container.load(userContainerModule);

const controller = container.get<CompanyController>(COMPANY_INV.CompanyController);

companyRouter.get('/all', catchErrors(controller.getAllCompanies.bind(controller)));
companyRouter.get('/search', catchErrors(controller.searchByNameAndEmail.bind(controller)));
companyRouter.get('/:id', catchErrors(controller.getCompanyById.bind(controller)));

//---RecSys---

companyRouter.post('/recSys', catchErrors(controller.addRecSysCompanies.bind(controller)));

export { companyRouter, companyContainerModule };
