import { Exclude, Expose, Type } from 'class-transformer';

import { UserSimpleResponseDto } from '../../user/dtos/user-response.dto';

@Exclude()
export class CompanyResponseDto {
  @Expose()
  id: number;

  @Expose()
  isBanned: boolean;

  @Expose()
  email: string;

  password: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  profilePicture: string;

  @Expose()
  industry: string;

  @Expose()
  country: string;

  @Expose()
  state: string;

  @Expose()
  city: string;

  @Expose()
  @Type(() => UserSimpleResponseDto)
  owner: UserSimpleResponseDto;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

@Exclude()
export class CompanySimpleResponseDto {
  @Expose()
  id: number;

  @Expose()
  isBanned: boolean;

  @Expose()
  email: string;

  password: string;

  @Expose()
  name: string;

  //TODO COMPLETE THIS
}
