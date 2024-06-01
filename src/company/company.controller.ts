import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';

import { CompanyService } from './company.service';
import { COMPANY_INV } from '../common/utils/inversifyConstants';
import { StatusCodes } from 'http-status-codes';
import { plainToInstance } from 'class-transformer';
import { CompanyResponseDto } from './dtos/company-response.dto';

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

  async getCompanyById(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    //validate logic

    const data = await this.companyService.getCompanyById(id);

    //response logic

    const responseData = plainToInstance(CompanyResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  async searchByNameAndEmail(req: Request, res: Response, next: NextFunction) {
    const encodedSearchTerm = req.query.searchTerm as string;
    const searchTerms = decodeURIComponent(encodedSearchTerm).split(' ');

    //validate logic

    const data = await this.companyService.searchByNameAndEmail(searchTerms);

    //response logic

    const responseData = plainToInstance(CompanyResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  //---RecSys---

  async addRecSysCompanies(req: Request, res: Response, next: NextFunction) {
    const recSysCompanies = await this.companyService.addRecSysCompanies();

    const data = plainToInstance(CompanyResponseDto, recSysCompanies);

    return res.status(StatusCodes.CREATED).json(data);
  }
}
