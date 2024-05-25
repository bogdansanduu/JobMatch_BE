import { Exclude, Expose, Type } from 'class-transformer';

import { UserToRoom } from '../../chat/room/entities/user-to-room.entity';
import { Room } from '../../chat/room/entities/room.entity';
import { Message } from '../../chat/message/entity/message.entity';
import { Post } from '../../posts/entities/post.entity';
import { Like } from '../../like/entities/like.entity';
import { Company } from '../../company/entities/company.entity';
import { CompanySimpleResponseDto } from '../../company/dtos/company-response.dto';
import { JobApplication } from '../../job-application/entities/job-application.entity';

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
  country: string;

  @Expose()
  state: string;

  @Expose()
  city: string;

  @Expose()
  resume: string;

  @Expose()
  socketId: string;

  userToRooms: UserToRoom[];

  roomsAsHost: Room[];

  messages: Message[];

  @Expose()
  @Type(() => UserResponseDto)
  followers: UserResponseDto[];

  @Expose()
  @Type(() => UserResponseDto)
  following: UserResponseDto[];

  posts: Post[];

  likes: Like[];

  @Expose()
  jobApplications: JobApplication[];

  @Expose()
  role: string;

  @Expose()
  @Type(() => CompanySimpleResponseDto)
  company: Company;

  createdAt: Date;

  updatedAt: Date;
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
