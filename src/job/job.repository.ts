import { FindManyOptions, Like, Repository } from 'typeorm';
import { injectable } from 'inversify';

import { Job } from './entities/job.entity';
import { dataSource } from '../database/dataSource';

@injectable()
export class JobRepository {
  private readonly jobRepo: Repository<Job>;

  constructor() {
    this.jobRepo = dataSource.getRepository<Job>(Job);
  }

  findAll() {
    return this.jobRepo.find({
      relations: {
        company: true,
      },
    });
  }

  findAllByCompany(companyId: number) {
    return this.jobRepo.find({
      where: {
        company: {
          id: companyId,
        },
      },
      relations: {
        company: true,
      },
    });
  }

  count() {
    return this.jobRepo.count();
  }

  findAllPaginated(page: number, limit: number, searchTerm?: string) {
    const query: FindManyOptions<Job> = {
      relations: {
        company: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    };

    if (searchTerm) {
      query.where = [
        { title: Like(`%${searchTerm}%`) },
        { description: Like(`%${searchTerm}%`) },
        { company: { name: Like(`%${searchTerm}%`) } },
      ];
    }

    return this.jobRepo.find(query);
  }

  findOne(id: number) {
    return this.jobRepo.findOne({
      where: {
        id,
      },
      relations: {
        company: true,
      },
    });
  }

  createJob(jobData: Partial<Job>) {
    const job = this.jobRepo.create(jobData);

    return this.jobRepo.save(job);
  }
}
