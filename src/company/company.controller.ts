import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';

import { CompanyService } from './company.service';
import { COMPANY_INV } from '../common/utils/inversifyConstants';
import { StatusCodes } from 'http-status-codes';
import { plainToInstance } from 'class-transformer';
import { CompanyResponseDto } from './dtos/company-response.dto';
import { validateBody } from '../common/utils/validateBody';
import { BanCompanyValidation } from './dtos/ban-company.validation';
import { JwtAuth } from '../common/decorators/jwt-auth.decorator';
import { RequiresRoles } from '../common/decorators/requires-roles.decorator';
import { Roles } from '../common/constants/user.constants';

@injectable()
export class CompanyController {
  private readonly companyService: CompanyService;

  constructor(
    @inject(COMPANY_INV.CompanyService)
    companyService: CompanyService
  ) {
    this.companyService = companyService;
  }

  @JwtAuth()
  @RequiresRoles([Roles.ADMIN, Roles.USER, Roles.COMPANY, Roles.COMPANY_OWNER])
  async getAllCompanies(req: Request, res: Response, next: NextFunction) {
    const isBanned = req.query.banned === 'true';

    const data = await this.companyService.getAllCompanies(isBanned);

    //response logic

    const responseData = plainToInstance(CompanyResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  @JwtAuth()
  @RequiresRoles([Roles.ADMIN, Roles.USER, Roles.COMPANY, Roles.COMPANY_OWNER])
  async getCompanyById(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    //validate logic

    const data = await this.companyService.getCompanyById(id);

    //response logic

    const responseData = plainToInstance(CompanyResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  @JwtAuth()
  @RequiresRoles([Roles.ADMIN, Roles.USER, Roles.COMPANY, Roles.COMPANY_OWNER])
  async searchByNameAndEmail(req: Request, res: Response, next: NextFunction) {
    const encodedSearchTerm = req.query.searchTerm as string;
    const searchTerms = decodeURIComponent(encodedSearchTerm).split(' ');

    //validate logic

    const data = await this.companyService.searchByNameAndEmail(searchTerms);

    //response logic

    const responseData = plainToInstance(CompanyResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  @JwtAuth()
  @RequiresRoles([Roles.ADMIN])
  async banCompany(req: Request, res: Response, next: NextFunction) {
    const companyId = Number(req.params.id);
    const body = req.body;

    //validate logic

    await validateBody(body, BanCompanyValidation);

    const data = await this.companyService.banCompany(companyId, body.banned);

    //response logic

    const responseData = plainToInstance(CompanyResponseDto, data, { excludeExtraneousValues: true });

    return res.status(StatusCodes.OK).json(responseData);
  }

  //---RecSys---

  @JwtAuth()
  @RequiresRoles([Roles.ADMIN])
  async addRecSysCompanies(req: Request, res: Response, next: NextFunction) {
    const recSysCompanies = await this.companyService.addRecSysCompanies();

    const data = plainToInstance(CompanyResponseDto, recSysCompanies);

    return res.status(StatusCodes.CREATED).json(data);
  }
}
