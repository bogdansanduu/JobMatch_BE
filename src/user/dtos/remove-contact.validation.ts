import { IsDefined, IsNumber } from 'class-validator';

export class RemoveContactValidation {
  @IsDefined()
  @IsNumber()
  userId: number;

  @IsDefined()
  @IsNumber()
  contactId: number;
}
