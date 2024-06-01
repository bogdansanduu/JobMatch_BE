import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class UploadResumeValidation {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  fileKey: string;
}
