import { Exclude, Expose, Type } from 'class-transformer';
import { UserResponseDto } from '../../user/dtos/user-response.dto';
import { LikeResponseDto } from '../../like/dtos/like-response.dto';
import { CommentResponseDto } from '../../comment/dtos/comment-response.dto';

@Exclude()
export class PostResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  picture: string;

  @Expose()
  @Type(() => UserResponseDto)
  author: UserResponseDto;

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
