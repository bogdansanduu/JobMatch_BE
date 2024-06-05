import { IsDefined, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { APPLICATION_STATUS } from '../../common/constants/job-application.constants';

export class ReviewApplicationValidation {
  @IsDefined()
  @IsEnum(APPLICATION_STATUS)
  @IsNotEmpty()
  status: APPLICATION_STATUS;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  observations: string;
}
