import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostValidation {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsString()
  picture?: string;
}
