import { Exclude, Expose, Type } from 'class-transformer';
import { JobResponseDto } from '../../job/dtos/job-response.dto';
import { UserSimpleResponseDto } from '../../user/dtos/user-response.dto';

@Exclude()
export class JobApplicationResponseDto {
  @Expose()
  id: number;

  @Expose()
  resume: string;

  @Expose()
  @Type(() => JobResponseDto)
  job: JobResponseDto;

  @Expose()
  @Type(() => UserSimpleResponseDto)
  applicant: UserSimpleResponseDto;

  @Expose()
  applicationDate: Date;

  updateDate: Date;
}
