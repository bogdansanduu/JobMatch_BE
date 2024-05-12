import { Expose, Type } from 'class-transformer';
import { UserSimpleResponseDto } from '../../user/dtos/user-response.dto';
import { CompanySimpleResponseDto } from '../../company/dtos/company-response.dto';

@Expose()
export class LikeResponseDto {
  @Expose()
  id: number;

  // @Expose()
  // @Type(() => PostResponseDto)
  // post: PostResponseDto;

  @Expose()
  @Type(() => CompanySimpleResponseDto)
  company: CompanySimpleResponseDto;

  @Expose()
  @Type(() => UserSimpleResponseDto)
  author: UserSimpleResponseDto;
}
