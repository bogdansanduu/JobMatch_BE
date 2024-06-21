import { Expose, Type } from 'class-transformer';
import { JobResponseDto } from '../../job/dtos/job-response.dto';
import { UserSimpleResponseDto } from '../../user/dtos/user-response.dto';

@Expose()
export class JobSavedResponseDto {
  @Expose()
  id: number;

  @Expose()
  @Type(() => JobResponseDto)
  job: JobResponseDto;

  @Expose()
  @Type(() => UserSimpleResponseDto)
  user: UserSimpleResponseDto;

  @Expose()
  savedAt: Date;
}
