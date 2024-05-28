import { EntitySchema, MixedList } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Token } from '../auth/entities/token.entity';
import { Message } from '../chat/message/entity/message.entity';
import { Room } from '../chat/room/entities/room.entity';
import { UserToRoom } from '../chat/room/entities/user-to-room.entity';
import { Post } from '../posts/entities/post.entity';
import { Comment } from '../comment/entities/comment.entity';
import { Like } from '../like/entities/like.entity';
import { Company } from '../company/entities/company.entity';
import { Job } from '../job/entities/job.entity';
import { JobApplication } from '../job-application/entities/job-application.entity';
import { JobSaved } from '../job-saved/entities/job-saved.entity';

export const ENTITIES: MixedList<string | Function | EntitySchema> = [
  User,
  Token,
  Message,
  Room,
  UserToRoom,
  Post,
  Comment,
  Like,
  Company,
  Job,
  JobApplication,
  JobSaved,
];
