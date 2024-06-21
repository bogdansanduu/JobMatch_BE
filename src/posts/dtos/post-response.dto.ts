import { Exclude, Expose, Type } from 'class-transformer';
import { UserResponseDto, UserSimpleResponseDto } from '../../user/dtos/user-response.dto';
import { LikeResponseDto } from '../../like/dtos/like-response.dto';
import { CommentResponseDto } from '../../comment/dtos/comment-response.dto';
import { CompanyResponseDto, CompanySimpleResponseDto } from '../../company/dtos/company-response.dto';

@Exclude()
export class PostSimpleResponseDto {
  @Expose()
  id: number;

  @Expose()
  @Type(() => UserSimpleResponseDto)
  author: UserSimpleResponseDto;

  @Expose()
  @Type(() => CompanySimpleResponseDto)
  company: CompanySimpleResponseDto;
}

@Exclude()
export class PostResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  @Type(() => UserResponseDto)
  author: UserResponseDto;

  @Expose()
  @Type(() => CompanyResponseDto)
  company: CompanyResponseDto;

  @Expose()
  @Type(() => LikeResponseDto)
  likes: LikeResponseDto[];

  @Expose()
  @Type(() => CommentResponseDto)
  comments: CommentResponseDto[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
