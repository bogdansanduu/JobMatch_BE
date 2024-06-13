import { IsBoolean, IsDefined } from 'class-validator';

export class BanUserValidation {
  @IsDefined()
  @IsBoolean()
  banned: boolean;
}
