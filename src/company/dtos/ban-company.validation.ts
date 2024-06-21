import { IsBoolean, IsDefined } from 'class-validator';

export class BanCompanyValidation {
  @IsDefined()
  @IsBoolean()
  banned: boolean;
}
