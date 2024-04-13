import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDto {
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
  followers: UserDto[];

  @Expose()
  following: UserDto[];
}
