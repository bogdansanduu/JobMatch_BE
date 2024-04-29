import { injectable } from 'inversify';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { dataSource } from '../database/dataSource';

@injectable()
export class CompanyRepository {
  private readonly companyRepo: Repository<Company>;

  constructor() {
    this.companyRepo = dataSource.getRepository<Company>(Company);
  }

  findAll() {
    return this.companyRepo.find({
      relations: {
        owner: true,
      },
    });
  }

  findByEmail(email: string) {
    return this.companyRepo.findOne({
      where: {
        email,
      },
      relations: {
        owner: true,
      },
    });
  }

  createCompany(companyData: Partial<Company>) {
    const company = this.companyRepo.create(companyData);

    return this.companyRepo.save(company);
  }
}
