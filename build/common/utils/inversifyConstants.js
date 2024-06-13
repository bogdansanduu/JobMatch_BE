"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWS_SES_INV = exports.AWS_S3_DOCUMENT_INV = exports.JOB_SAVED_INV = exports.JOB_APPLICATION_INV = exports.RECOMMENDATION_INV = exports.JOB_INV = exports.COMPANY_INV = exports.COMMENT_INV = exports.LIKE_INV = exports.POST_INV = exports.ROOM_INV = exports.MESSAGE_INV = exports.AUTH_INV = exports.USER_INV = void 0;
exports.USER_INV = {
    UserRepository: Symbol.for('UserRepository'),
    UserService: Symbol.for('UserService'),
    UserController: Symbol.for('UserController'),
};
exports.AUTH_INV = {
    TokenRepository: Symbol.for('TokenRepository'),
    AuthService: Symbol.for('AuthService'),
    AuthController: Symbol.for('AuthController'),
};
exports.MESSAGE_INV = {
    MessageRepository: Symbol.for('MessageRepository'),
    MessageService: Symbol.for('MessageService'),
    MessageGateway: Symbol.for('MessageGateway'),
};
exports.ROOM_INV = {
    RoomRepository: Symbol.for('RoomRepository'),
    RoomService: Symbol.for('RoomService'),
    RoomGateway: Symbol.for('RoomGateway'),
};
exports.POST_INV = {
    PostRepository: Symbol.for('PostRepository'),
    PostService: Symbol.for('PostService'),
    PostController: Symbol.for('PostController'),
};
exports.LIKE_INV = {
    LikeRepository: Symbol.for('LikeRepository'),
    LikeService: Symbol.for('LikeService'),
    LikeController: Symbol.for('LikeController'),
};
exports.COMMENT_INV = {
    CommentRepository: Symbol.for('CommentRepository'),
    CommentService: Symbol.for('CommentService'),
    CommentController: Symbol.for('CommentController'),
};
exports.COMPANY_INV = {
    CompanyRepository: Symbol.for('CompanyRepository'),
    CompanyService: Symbol.for('CompanyService'),
    CompanyController: Symbol.for('CompanyController'),
};
exports.JOB_INV = {
    JobRepository: Symbol.for('JobRepository'),
    JobService: Symbol.for('JobService'),
    JobController: Symbol.for('JobController'),
};
exports.RECOMMENDATION_INV = {
    RecommendationService: Symbol.for('RecommendationService'),
    RecommendationController: Symbol.for('RecommendationController'),
};
exports.JOB_APPLICATION_INV = {
    JobApplicationRepository: Symbol.for('JobApplicationRepository'),
    JobApplicationService: Symbol.for('JobApplicationService'),
    JobApplicationController: Symbol.for('JobApplicationController'),
};
exports.JOB_SAVED_INV = {
    JobSavedRepository: Symbol.for('JobSavedRepository'),
    JobSavedService: Symbol.for('JobSavedService'),
    JobSavedController: Symbol.for('JobSavedController'),
};
exports.AWS_S3_DOCUMENT_INV = {
    S3DocumentService: Symbol.for('S3DocumentService'),
    S3DocumentController: Symbol.for('S3DocumentController'),
};
exports.AWS_SES_INV = {
    SESService: Symbol.for('SesService'),
    SESController: Symbol.for('SesController'),
};
//# sourceMappingURL=inversifyConstants.js.map