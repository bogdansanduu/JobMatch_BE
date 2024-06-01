import { Exclude, Expose, Type } from 'class-transformer';
import { CompanyResponseDto } from '../../company/dtos/company-response.dto';
import { JobApplicationResponseDto } from '../../job-application/dtos/job-application-response.dto';

@Exclude()
export class JobResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  category: string;

  @Expose()
  country: string;

  @Expose()
  state: string;

  @Expose()
  city: string;

  @Expose()
  lat: number;

  @Expose()
  lng: number;

  @Expose()
  responsibilities: string;

  @Expose()
  minimumQualifications: string;

  @Expose()
  preferredQualifications: string;

  @Expose()
  @Type(() => JobApplicationResponseDto)
  applications: JobApplicationResponseDto[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => CompanyResponseDto)
  company: CompanyResponseDto;
}
