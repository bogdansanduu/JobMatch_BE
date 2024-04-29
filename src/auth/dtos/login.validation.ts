import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginValidation {
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  password: string;
}
