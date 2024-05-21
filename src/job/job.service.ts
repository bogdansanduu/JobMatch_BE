import { inject, injectable } from 'inversify';
import * as fs from 'fs';
import { parse } from 'csv-parse';

import { COMPANY_INV, JOB_INV } from '../common/utils/inversifyConstants';
import { JobRepository } from './job.repository';
import { CreateJobValidation } from './dtos/create-job.validation';
import { CompanyService } from '../company/company.service';
import { Job } from './entities/job.entity';
import { InvalidException } from '../common/exceptions/invalid.exception';

@injectable()
export class JobService {
  private readonly jobRepository: JobRepository;

  private readonly companyService: CompanyService;

  constructor(
    @inject(JOB_INV.JobRepository)
    jobRepository: JobRepository,
    @inject(COMPANY_INV.CompanyService)
    companyService: CompanyService
  ) {
    this.jobRepository = jobRepository;
    this.companyService = companyService;
  }

  async getAllJobs() {
    return this.jobRepository.findAll();
  }

  async getAllJobsByCompany(companyId: number) {
    if (!companyId) {
      throw new InvalidException('Company ID is invalid.');
    }

    return this.jobRepository.findAllByCompany(companyId);
  }

  async getAllJobsPaginated(page: number, limit: number, searchTerm?: string) {
    const data = await this.jobRepository.findAllPaginated(page, limit, searchTerm);
    const totalItems = await this.jobRepository.count();

    return {
      data,
      totalItems,
      currentPage: page,
    };
  }

  async getJobById(id: number) {
    return this.jobRepository.findOne(id);
  }

  async createJob(job: CreateJobValidation) {
    const company = await this.companyService.getCompanyById(job.companyId);

    return this.jobRepository.createJob({
      ...job,
      company,
    });
  }

  //---RecSys---

  async addRecSysJobs() {
    const jobs: Job[] = [];

    const parser = fs.createReadStream(`${__dirname}../../../assets/modified_job_skills_cleaned.csv`).pipe(
      parse({
        columns: true,
        delimiter: ',',
        trim: true,
        skip_empty_lines: true,
      })
    );

    for await (const jobData of parser) {
      const companyName = jobData.Company;

      const company = await this.companyService.getCompanyByName(companyName);

      if (!company) {
        console.log(`Company ${companyName} not found.`);
        continue;
      }

      // Handling location parsing
      const locationParts = jobData.Location.split(',').map((part) => part.trim());
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

      const title = jobData.Title;
      const category = jobData.Category;
      const responsibilities = jobData.Responsibilities;
      const minimumQualifications = jobData.Minimum_Qualifications;
      const preferredQualifications = jobData.Preferred_Qualifications;
      const lat = parseFloat(jobData.Latitude);
      const lng = parseFloat(jobData.Longitude);

      // Default description as it's not provided in the CSV
      const description = 'Description not available.';

      const newJob = await this.createJob({
        title,
        description,
        category,
        country,
        city,
        state,
        lat,
        lng,
        responsibilities,
        minimumQualifications,
        preferredQualifications,
        companyId: company.id,
      });

      jobs.push(newJob);

      console.log(`Added job for ${jobData.Company}: ${title}`);
    }

    return jobs;
  }
}
