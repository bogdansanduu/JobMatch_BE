import { IsDefined, IsEmail, IsString } from 'class-validator';

export class RegisterValidation {
  @IsDefined()
  @IsString()
  firstName: string;

  @IsDefined()
  @IsString()
  lastName: string;

  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  password: string;

  @IsDefined()
  @IsString()
  country: string;

  @IsDefined()
  @IsString()
  city: string;

  @IsDefined()
  @IsString()
  state: string;
}
