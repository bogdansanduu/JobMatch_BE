import { Exclude, Expose, Type } from 'class-transformer';
import { UserSimpleResponseDto } from '../../user/dtos/user-response.dto';
import { LikeResponseDto } from '../../like/dtos/like-response.dto';
import { PostSimpleResponseDto } from '../../posts/dtos/post-response.dto';
import { CompanySimpleResponseDto } from '../../company/dtos/company-response.dto';

@Exclude()
export class CommentResponseDto {
  @Expose()
  id: number;

  @Expose()
  content: string;

  @Expose()
  @Type(() => PostSimpleResponseDto)
  post: PostSimpleResponseDto;

  @Expose()
  @Type(() => LikeResponseDto)
  likes: LikeResponseDto[];

  @Expose()
  @Type(() => CompanySimpleResponseDto)
  company: CompanySimpleResponseDto;

  @Expose()
  @Type(() => UserSimpleResponseDto)
  author: UserSimpleResponseDto;
}
