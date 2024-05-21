import { inject, injectable } from 'inversify';
import bcrypt from 'bcrypt';
import * as fs from 'fs';
import { parse } from 'csv-parse';

import { CompanyRepository } from './company.repository';
import { COMPANY_INV, USER_INV } from '../common/utils/inversifyConstants';
import { CreateCompanyValidation } from './dtos/create-company.validation';
import UserService from '../user/user.service';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { DEFUALT_PROFILE_PICTURE } from '../common/constants/user.constants';
import { User } from '../user/entities/user.entity';
import { Company } from './entities/company.entity';

@injectable()
export class CompanyService {
  private readonly companyRepository: CompanyRepository;

  private readonly userService: UserService;

  constructor(
    @inject(COMPANY_INV.CompanyRepository)
    companyRepository: CompanyRepository,
    @inject(USER_INV.UserService)
    userService: UserService
  ) {
    this.userService = userService;
    this.companyRepository = companyRepository;
  }

  async getCompanyById(id: number) {
    const company = await this.companyRepository.getCompanyById(id);

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return company;
  }

  async getAllCompanies() {
    return this.companyRepository.findAll();
  }

  async getCompanyByEmail(email: string) {
    return this.companyRepository.findByEmail(email);
  }

  async getCompanyByName(name: string) {
    return this.companyRepository.findByName(name);
  }

  async createCompany(company: CreateCompanyValidation) {
    const owner = await this.userService.getUserById(company.ownerId);

    if (!owner) {
      throw new NotFoundException('User not found');
    }

    company.profilePicture = company.profilePicture || DEFUALT_PROFILE_PICTURE;

    return this.companyRepository.createCompany({
      ...company,
      owner,
    });
  }

  async searchByNameAndEmail(searchTerms: string[]) {
    const companies = await this.companyRepository.searchByNameAndEmail(searchTerms);

    return companies.slice(0, 5);
  }

  //---RecSys---

  async addRecSysCompanies() {
    const companies: Company[] = [];

    const uniqueCompanies = new Set();
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const password = 'recommendation';
    const hashedPassword = await bcrypt.hash(password, salt);

    const parser = fs.createReadStream(`${__dirname}../../../assets/modified_job_skills_cleaned.csv`).pipe(
      parse({
        columns: true,
        delimiter: ',',
        trim: true,
        skip_empty_lines: true,
      })
    );

    const recSysUsers: User[] = [];

    for (let i = 1; i <= 6; i++) {
      const recSysUser = await this.userService.getUserByEmail(`recsys${i}@recsys.com`);

      if (recSysUser) {
        recSysUsers.push(recSysUser);
      }
    }

    let index = 1;

    for await (const companyData of parser) {
      if (!uniqueCompanies.has(companyData.Company)) {
        uniqueCompanies.add(companyData.Company);

        // Handling location parsing
        const locationParts = companyData.Location.split(',').map((part) => part.trim());
        let city: string = '';
        let state: string = '';
        let country: string = '';

        if (locationParts.length === 3) {
          [city, state, country] = locationParts;
        } else if (locationParts.length === 2) {
          [city, country] = locationParts;
        } else if (locationParts.length === 1) {
          country = locationParts[0];
        }

        const email = `recsys${index}@recsys.com`;
        const companyName = companyData.Company;
        const industry = 'IT';
        // @ts-ignore
        const ownerId = recSysUsers[index - 1].id;

        const newCompany = await this.createCompany({
          email,
          password: hashedPassword,
          name: companyName,
          city,
          state,
          country,
          industry,
          ownerId: ownerId,
        });

        console.log(`Created company: ${companyName}`);

        index++;
        companies.push(newCompany);
      }
    }

    return companies;
  }
}
