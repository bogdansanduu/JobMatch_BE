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
}
