"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.centralizedContainer = void 0;
const inversify_1 = require("inversify");
const inversifyConstants_1 = require("../utils/inversifyConstants");
const user_repository_1 = __importDefault(require("../../user/user.repository"));
const user_service_1 = __importDefault(require("../../user/user.service"));
const user_controller_1 = __importDefault(require("../../user/user.controller"));
const company_repository_1 = require("../../company/company.repository");
const company_service_1 = require("../../company/company.service");
const company_controller_1 = require("../../company/company.controller");
const s3_document_service_1 = require("../../s3-document/s3-document.service");
const s3_document_controller_1 = require("../../s3-document/s3-document.controller");
const recommendation_controller_1 = require("../../recommendation/recommendation.controller");
const recommendation_service_1 = require("../../recommendation/recommendation.service");
const post_repository_1 = require("../../posts/post.repository");
const post_controller_1 = require("../../posts/post.controller");
const post_service_1 = require("../../posts/post.service");
const like_repository_1 = require("../../like/like.repository");
const like_service_1 = require("../../like/like.service");
const job_saved_repository_1 = require("../../job-saved/job-saved.repository");
const job_saved_service_1 = require("../../job-saved/job-saved.service");
const job_saved_controller_1 = require("../../job-saved/job-saved.controller");
const job_application_repository_1 = require("../../job-application/job-application.repository");
const job_application_service_1 = require("../../job-application/job-application.service");
const job_application_controller_1 = require("../../job-application/job-application.controller");
const job_repository_1 = require("../../job/job.repository");
const job_service_1 = require("../../job/job.service");
const job_controller_1 = require("../../job/job.controller");
const ses_service_1 = require("../../email/ses.service");
const ses_controller_1 = require("../../email/ses.controller");
const comment_repository_1 = require("../../comment/comment.repository");
const comment_controller_1 = require("../../comment/comment.controller");
const comment_service_1 = require("../../comment/comment.service");
const room_service_1 = require("../../chat/room/room.service");
const message_service_1 = __importDefault(require("../../chat/message/message.service"));
const token_repo_1 = require("../../auth/token.repo");
const auth_service_1 = __importDefault(require("../../auth/auth.service"));
const auth_controller_1 = require("../../auth/auth.controller");
const room_repository_1 = require("../../chat/room/room.repository");
const userContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(inversifyConstants_1.USER_INV.UserRepository).to(user_repository_1.default);
    bind(inversifyConstants_1.USER_INV.UserService).to(user_service_1.default);
    bind(inversifyConstants_1.USER_INV.UserController).to(user_controller_1.default);
});
const companyContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(inversifyConstants_1.COMPANY_INV.CompanyRepository).to(company_repository_1.CompanyRepository);
    bind(inversifyConstants_1.COMPANY_INV.CompanyService).to(company_service_1.CompanyService);
    bind(inversifyConstants_1.COMPANY_INV.CompanyController).to(company_controller_1.CompanyController);
});
const s3DocumentContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(inversifyConstants_1.AWS_S3_DOCUMENT_INV.S3DocumentService).to(s3_document_service_1.S3DocumentService);
    bind(inversifyConstants_1.AWS_S3_DOCUMENT_INV.S3DocumentController).to(s3_document_controller_1.S3DocumentController);
});
const recommendationContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(inversifyConstants_1.RECOMMENDATION_INV.RecommendationController).to(recommendation_controller_1.RecommendationController);
    bind(inversifyConstants_1.RECOMMENDATION_INV.RecommendationService).to(recommendation_service_1.RecommendationService);
});
const postContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(inversifyConstants_1.POST_INV.PostRepository).to(post_repository_1.PostRepository);
    bind(inversifyConstants_1.POST_INV.PostController).to(post_controller_1.PostController);
    bind(inversifyConstants_1.POST_INV.PostService).to(post_service_1.PostService);
});
const likeContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(inversifyConstants_1.LIKE_INV.LikeRepository).to(like_repository_1.LikeRepository);
    bind(inversifyConstants_1.LIKE_INV.LikeService).to(like_service_1.LikeService);
});
const jobSavedContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(inversifyConstants_1.JOB_SAVED_INV.JobSavedRepository).to(job_saved_repository_1.JobSavedRepository);
    bind(inversifyConstants_1.JOB_SAVED_INV.JobSavedService).to(job_saved_service_1.JobSavedService);
    bind(inversifyConstants_1.JOB_SAVED_INV.JobSavedController).to(job_saved_controller_1.JobSavedController);
});
const jobApplicationContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(inversifyConstants_1.JOB_APPLICATION_INV.JobApplicationRepository).to(job_application_repository_1.JobApplicationRepository);
    bind(inversifyConstants_1.JOB_APPLICATION_INV.JobApplicationService).to(job_application_service_1.JobApplicationService);
    bind(inversifyConstants_1.JOB_APPLICATION_INV.JobApplicationController).to(job_application_controller_1.JobApplicationController);
});
const jobContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(inversifyConstants_1.JOB_INV.JobRepository).to(job_repository_1.JobRepository);
    bind(inversifyConstants_1.JOB_INV.JobService).to(job_service_1.JobService);
    bind(inversifyConstants_1.JOB_INV.JobController).to(job_controller_1.JobController);
});
const emailContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(inversifyConstants_1.AWS_SES_INV.SESService).to(ses_service_1.SESService);
    bind(inversifyConstants_1.AWS_SES_INV.SESController).to(ses_controller_1.SESController);
});
const commentContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(inversifyConstants_1.COMMENT_INV.CommentRepository).to(comment_repository_1.CommentRepository);
    bind(inversifyConstants_1.COMMENT_INV.CommentController).to(comment_controller_1.CommentController);
    bind(inversifyConstants_1.COMMENT_INV.CommentService).to(comment_service_1.CommentService);
});
const roomContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(inversifyConstants_1.ROOM_INV.RoomService).to(room_service_1.RoomService);
    bind(inversifyConstants_1.ROOM_INV.RoomRepository).to(room_repository_1.RoomRepository);
});
const messageContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(inversifyConstants_1.MESSAGE_INV.MessageService).to(message_service_1.default);
});
const authContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(inversifyConstants_1.AUTH_INV.TokenRepository).to(token_repo_1.TokenRepository);
    bind(inversifyConstants_1.AUTH_INV.AuthService).to(auth_service_1.default);
    bind(inversifyConstants_1.AUTH_INV.AuthController).to(auth_controller_1.AuthController);
});
const centralizedContainer = new inversify_1.Container();
exports.centralizedContainer = centralizedContainer;
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
//# sourceMappingURL=centralizedContainer.js.map