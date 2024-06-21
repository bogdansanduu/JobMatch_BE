import { Container, ContainerModule } from 'inversify';

import { UserRepositoryInterface } from '../../user/interfaces/user-repository.interface';
import {
  AUTH_INV,
  AWS_S3_DOCUMENT_INV,
  AWS_SES_INV,
  COMMENT_INV,
  COMPANY_INV,
  JOB_APPLICATION_INV,
  JOB_INV,
  JOB_SAVED_INV,
  LIKE_INV,
  MESSAGE_INV,
  POST_INV,
  RECOMMENDATION_INV,
  ROOM_INV,
  USER_INV,
} from '../utils/inversifyConstants';
import UserRepository from '../../user/user.repository';
import { UserServiceInterface } from '../../user/interfaces/user-service.interface';
import UserService from '../../user/user.service';
import UserController from '../../user/user.controller';
import { CompanyRepository } from '../../company/company.repository';
import { CompanyService } from '../../company/company.service';
import { CompanyController } from '../../company/company.controller';
import { S3DocumentService } from '../../s3-document/s3-document.service';
import { S3DocumentController } from '../../s3-document/s3-document.controller';
import { RecommendationController } from '../../recommendation/recommendation.controller';
import { RecommendationService } from '../../recommendation/recommendation.service';
import { PostRepository } from '../../posts/post.repository';
import { PostController } from '../../posts/post.controller';
import { PostService } from '../../posts/post.service';
import { LikeRepository } from '../../like/like.repository';
import { LikeService } from '../../like/like.service';
import { JobSavedRepository } from '../../job-saved/job-saved.repository';
import { JobSavedService } from '../../job-saved/job-saved.service';
import { JobSavedController } from '../../job-saved/job-saved.controller';
import { JobApplicationRepository } from '../../job-application/job-application.repository';
import { JobApplicationService } from '../../job-application/job-application.service';
import { JobApplicationController } from '../../job-application/job-application.controller';
import { JobRepository } from '../../job/job.repository';
import { JobService } from '../../job/job.service';
import { JobController } from '../../job/job.controller';
import { SESService } from '../../email/ses.service';
import { SESController } from '../../email/ses.controller';
import { CommentRepository } from '../../comment/comment.repository';
import { CommentController } from '../../comment/comment.controller';
import { CommentService } from '../../comment/comment.service';
import { RoomService } from '../../chat/room/room.service';
import MessageService from '../../chat/message/message.service';
import { TokenRepositoryInterface } from '../../auth/interfaces/token-repository.interface';
import { TokenRepository } from '../../auth/token.repo';
import { AuthServiceInterface } from '../../auth/interfaces/auth-service.interface';
import AuthService from '../../auth/auth.service';
import { AuthController } from '../../auth/auth.controller';
import { RoomRepository } from '../../chat/room/room.repository';

const userContainerModule = new ContainerModule((bind) => {
  bind<UserRepositoryInterface>(USER_INV.UserRepository).to(UserRepository);
  bind<UserServiceInterface>(USER_INV.UserService).to(UserService);
  bind(USER_INV.UserController).to(UserController);
});

const companyContainerModule = new ContainerModule((bind) => {
  bind(COMPANY_INV.CompanyRepository).to(CompanyRepository);
  bind(COMPANY_INV.CompanyService).to(CompanyService);
  bind(COMPANY_INV.CompanyController).to(CompanyController);
});

const s3DocumentContainerModule = new ContainerModule((bind) => {
  bind(AWS_S3_DOCUMENT_INV.S3DocumentService).to(S3DocumentService);
  bind(AWS_S3_DOCUMENT_INV.S3DocumentController).to(S3DocumentController);
});

const recommendationContainerModule = new ContainerModule((bind) => {
  bind(RECOMMENDATION_INV.RecommendationController).to(RecommendationController);
  bind(RECOMMENDATION_INV.RecommendationService).to(RecommendationService);
});

const postContainerModule = new ContainerModule((bind) => {
  bind(POST_INV.PostRepository).to(PostRepository);
  bind(POST_INV.PostController).to(PostController);
  bind(POST_INV.PostService).to(PostService);
});

const likeContainerModule = new ContainerModule((bind) => {
  bind(LIKE_INV.LikeRepository).to(LikeRepository);
  bind(LIKE_INV.LikeService).to(LikeService);
  // bind(LIKE_INV.LikeController).to(LikeController);
});

const jobSavedContainerModule = new ContainerModule((bind) => {
  bind(JOB_SAVED_INV.JobSavedRepository).to(JobSavedRepository);
  bind(JOB_SAVED_INV.JobSavedService).to(JobSavedService);
  bind(JOB_SAVED_INV.JobSavedController).to(JobSavedController);
});

const jobApplicationContainerModule = new ContainerModule((bind) => {
  bind(JOB_APPLICATION_INV.JobApplicationRepository).to(JobApplicationRepository);
  bind(JOB_APPLICATION_INV.JobApplicationService).to(JobApplicationService);
  bind(JOB_APPLICATION_INV.JobApplicationController).to(JobApplicationController);
});

const jobContainerModule = new ContainerModule((bind) => {
  bind(JOB_INV.JobRepository).to(JobRepository);
  bind(JOB_INV.JobService).to(JobService);
  bind(JOB_INV.JobController).to(JobController);
});

const emailContainerModule = new ContainerModule((bind) => {
  bind(AWS_SES_INV.SESService).to(SESService);
  bind(AWS_SES_INV.SESController).to(SESController);
});

const commentContainerModule = new ContainerModule((bind) => {
  bind(COMMENT_INV.CommentRepository).to(CommentRepository);
  bind(COMMENT_INV.CommentController).to(CommentController);
  bind(COMMENT_INV.CommentService).to(CommentService);
});

const roomContainerModule = new ContainerModule((bind) => {
  bind(ROOM_INV.RoomService).to(RoomService);
  bind(ROOM_INV.RoomRepository).to(RoomRepository);
});

const messageContainerModule = new ContainerModule((bind) => {
  bind(MESSAGE_INV.MessageService).to(MessageService);
});

const authContainerModule = new ContainerModule((bind) => {
  bind<TokenRepositoryInterface>(AUTH_INV.TokenRepository).to(TokenRepository);
  bind<AuthServiceInterface>(AUTH_INV.AuthService).to(AuthService);
  bind(AUTH_INV.AuthController).to(AuthController);
});

const centralizedContainer = new Container();
const modules = [
  userContainerModule,
  companyContainerModule,
  s3DocumentContainerModule,
  recommendationContainerModule,
  postContainerModule,
  likeContainerModule,
  jobSavedContainerModule,
  jobApplicationContainerModule,
  jobContainerModule,
  emailContainerModule,
  commentContainerModule,
  roomContainerModule,
  messageContainerModule,
  authContainerModule,
];

centralizedContainer.load(...modules);

export { centralizedContainer };
