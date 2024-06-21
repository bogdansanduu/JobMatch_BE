import { IsDefined, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCompanyValidation {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsDefined()
  @IsNotEmpty()
  email: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  industry: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  country: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  state: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsDefined()
  @IsNumber()
  ownerId: number;

  @IsString()
  @IsOptional()
  profilePicture?: string;

  @IsString()
  @IsString()
  @IsNotEmpty()
  description: string;
}
