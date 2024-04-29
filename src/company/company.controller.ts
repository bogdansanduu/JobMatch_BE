import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';

import { CompanyService } from './company.service';
import { COMPANY_INV } from '../common/utils/inversifyConstants';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class CompanyController {
  private readonly companyService: CompanyService;

  constructor(
    @inject(COMPANY_INV.CompanyService)
    companyService: CompanyService
  ) {
    this.companyService = companyService;
  }

  async getAllCompanies(req: Request, res: Response, next: NextFunction) {
    const data = await this.companyService.getAllCompanies();

    //response logic

    return res.status(StatusCodes.OK).json(data);
  }
}
