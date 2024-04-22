import { IsDefined, IsOptional, IsString } from 'class-validator';

export class CreatePostValidation {
  @IsDefined()
  @IsString()
  title: string;

  @IsDefined()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  picture?: string;
}
