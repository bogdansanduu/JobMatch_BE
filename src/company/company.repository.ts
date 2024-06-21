import { injectable } from 'inversify';
import { Company } from './entities/company.entity';
import { ILike, Repository } from 'typeorm';
import { dataSource } from '../database/dataSource';

@injectable()
export class CompanyRepository {
  private readonly companyRepo: Repository<Company>;

  constructor() {
    this.companyRepo = dataSource.getRepository<Company>(Company);
  }

  getCompanyById(id: number) {
    return this.companyRepo.findOne({
      where: {
        id,
      },
      relations: {
        owner: true,
        posts: true,
      },
    });
  }

  findAll(isBanned = false) {
    return this.companyRepo.find({
      where: {
        isBanned,
      },

      relations: {
        owner: true,
        posts: true,
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
        posts: true,
      },
    });
  }

  findByName(name: string) {
    return this.companyRepo.findOne({
      where: {
        name,
      },
      relations: {
        owner: true,
        posts: true,
      },
    });
  }

  createCompany(companyData: Partial<Company>) {
    const company = this.companyRepo.create(companyData);

    return this.companyRepo.save(company);
  }

  async updateCompany(id: number, companyData: Partial<Company>) {
    await this.companyRepo.update(id, companyData);

    return this.getCompanyById(id);
  }

  async searchByNameAndEmail(searchTerms: string[]): Promise<Company[]> {
    const whereConditions = searchTerms.map((searchTerm) => ({
      where: [{ name: ILike(`%${searchTerm}%`) }, { email: ILike(`%${searchTerm}%`) }],
    }));

    const combinedConditions = whereConditions.reduce((acc: { [key: string]: any }[], condition) => {
      acc.push(...condition.where);
      return acc;
    }, []);

    return this.companyRepo.find({
      where: combinedConditions,
    });
  }
}
