import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterValidation {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  currentPosition: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  resume: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  country: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  state: string;
}

export class AdminRegisterValidation {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  secret: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  password: string;
}
