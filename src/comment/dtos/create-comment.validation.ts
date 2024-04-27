import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentValidation {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  content: string;
}
