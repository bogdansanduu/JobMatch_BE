import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  password: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  profilePicture: string;

  @Expose()
  socketId: string;

  @Expose()
  @Type(() => UserResponseDto)
  followers: UserResponseDto[];

  @Expose()
  @Type(() => UserResponseDto)
  following: UserResponseDto[];
}

@Exclude()
export class UserSimpleResponseDto {
  @Expose()
  id: number;

  email: string;

  password: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  profilePicture: string;

  socketId: string;

  followers: UserResponseDto[];

  following: UserResponseDto[];
}
