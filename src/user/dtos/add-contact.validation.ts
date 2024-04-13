import { IsDefined, IsNumber } from 'class-validator';

export class AddContactValidation {
  @IsDefined()
  @IsNumber()
  userId: number;

  @IsDefined()
  @IsNumber()
  contactId: number;
}
