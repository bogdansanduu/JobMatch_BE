import { Exclude, Expose, Type } from 'class-transformer';

import { UserToRoom } from '../../chat/room/entities/user-to-room.entity';
import { Room } from '../../chat/room/entities/room.entity';
import { Message } from '../../chat/message/entity/message.entity';
import { Post } from '../../posts/entities/post.entity';
import { Like } from '../../like/entities/like.entity';
import { Company } from '../../company/entities/company.entity';
import { CompanySimpleResponseDto } from '../../company/dtos/company-response.dto';
import { JobApplication } from '../../job-application/entities/job-application.entity';
import { JobApplicationResponseDto } from '../../job-application/dtos/job-application-response.dto';
import { ResumeFile } from '../../common/types/resume-file.type';
import { JobSavedResponseDto } from '../../job-saved/dto/job-saved-response.dto';

@Exclude()
export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  role: string;

  @Expose()
  isBanned: boolean;

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
  currentPosition: string;

  @Expose()
  country: string;

  @Expose()
  state: string;

  @Expose()
  city: string;

  @Expose()
  resume: string;

  @Expose()
  resumeFile: ResumeFile;

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
  @Type(() => JobApplicationResponseDto)
  jobApplications: JobApplication[];

  @Expose()
  @Type(() => JobSavedResponseDto)
  jobsSaved: JobSavedResponseDto[];

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

  @Expose()
  role: string;

  @Expose()
  isBanned: boolean;

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
  currentPosition: string;

  @Expose()
  resume: string;

  @Expose()
  resumeFile: ResumeFile;

  socketId: string;

  followers: UserResponseDto[];

  following: UserResponseDto[];
}
