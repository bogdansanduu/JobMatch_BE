import { IsDefined, IsString } from 'class-validator';

export class CreateCommentValidation {
  @IsDefined()
  @IsString()
  content: string;
}
