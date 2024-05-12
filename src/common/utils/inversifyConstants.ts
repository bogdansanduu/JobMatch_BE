export const USER_INV = {
  UserRepository: Symbol.for('UserRepository'),
  UserService: Symbol.for('UserService'),
  UserController: Symbol.for('UserController'),
};

export const AUTH_INV = {
  TokenRepository: Symbol.for('TokenRepository'),
  AuthService: Symbol.for('AuthService'),
  AuthController: Symbol.for('AuthController'),
};

export const MESSAGE_INV = {
  MessageRepository: Symbol.for('MessageRepository'),
  MessageService: Symbol.for('MessageService'),
  MessageGateway: Symbol.for('MessageGateway'),
};

export const ROOM_INV = {
  RoomRepository: Symbol.for('RoomRepository'),
  RoomService: Symbol.for('RoomService'),
  RoomGateway: Symbol.for('RoomGateway'),
};

export const POST_INV = {
  PostRepository: Symbol.for('PostRepository'),
  PostService: Symbol.for('PostService'),
  PostController: Symbol.for('PostController'),
};

export const LIKE_INV = {
  LikeRepository: Symbol.for('LikeRepository'),
  LikeService: Symbol.for('LikeService'),
  LikeController: Symbol.for('LikeController'),
};

export const COMMENT_INV = {
  CommentRepository: Symbol.for('CommentRepository'),
  CommentService: Symbol.for('CommentService'),
  CommentController: Symbol.for('CommentController'),
};

export const COMPANY_INV = {
  CompanyRepository: Symbol.for('CompanyRepository'),
  CompanyService: Symbol.for('CompanyService'),
  CompanyController: Symbol.for('CompanyController'),
};

export const JOB_INV = {
  JobRepository: Symbol.for('JobRepository'),
  JobService: Symbol.for('JobService'),
  JobController: Symbol.for('JobController'),
};

export const RECOMMENDATION_INV = {
  RecommendationService: Symbol.for('RecommendationService'),
  RecommendationController: Symbol.for('RecommendationController'),
};
