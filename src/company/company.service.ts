import { inject, injectable } from 'inversify';

import { CompanyRepository } from './company.repository';
import { COMPANY_INV, USER_INV } from '../common/utils/inversifyConstants';
import { CreateCompanyValidation } from './dtos/create-company.validation';
import UserService from '../user/user.service';
import { NotFoundException } from '../common/exceptions/not-found.exception';

@injectable()
export class CompanyService {
  private readonly userService: UserService;
  private readonly companyRepository: CompanyRepository;

  constructor(
    @inject(USER_INV.UserService)
    userService: UserService,
    @inject(COMPANY_INV.CompanyRepository)
    companyRepository: CompanyRepository
  ) {
    this.userService = userService;
    this.companyRepository = companyRepository;
  }

  async getAllCompanies() {
    return this.companyRepository.findAll();
  }

  async getCompanyByEmail(email: string) {
    return this.companyRepository.findByEmail(email);
  }

  async createCompany(company: CreateCompanyValidation) {
    const owner = await this.userService.getUserById(company.ownerId);

    if (!owner) {
      throw new NotFoundException('User not found');
    }

    return this.companyRepository.createCompany({
      ...company,
      owner,
    });
  }
}
