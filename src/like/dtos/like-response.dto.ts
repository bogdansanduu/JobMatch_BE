import { Expose } from 'class-transformer';
// import { PostResponseDto } from '../../posts/dtos/post-response.dto';
// import { UserResponseDto } from '../../user/dtos/user-response.dto';

@Expose()
export class LikeResponseDto {
  @Expose()
  id: number;

  // @Expose()
  // @Type(() => PostResponseDto)
  // post: PostResponseDto;
  //
  // @Expose()
  // @Type(() => UserResponseDto)
  // author: UserResponseDto;
}
