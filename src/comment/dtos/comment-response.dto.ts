import { Exclude, Expose, Type } from 'class-transformer';
import { UserResponseDto } from '../../user/dtos/user-response.dto';

@Exclude()
export class CommentResponseDto {
  @Expose()
  id: number;

  // @Expose()
  // @Type(() => PostResponseDto)
  // post: PostResponseDto;

  @Expose()
  @Type(() => UserResponseDto)
  author: UserResponseDto;
}
