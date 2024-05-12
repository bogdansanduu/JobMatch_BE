import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateJobValidation {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  category: string;

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

  @IsOptional()
  @IsNumber()
  lat?: number;

  @IsOptional()
  @IsNumber()
  lng?: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  responsibilities: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  minimumQualifications: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  preferredQualifications: string;

  @IsDefined()
  @IsNumber()
  companyId: number;
}
