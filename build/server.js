"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.app = void 0;
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const path_1 = __importDefault(require("path"));
const pino_1 = require("pino");
const dotenv_1 = __importDefault(require("dotenv"));
require("./auth/passport");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
require("./common/s3/s3");
require("./chat/message/message.gateway");
require("./chat/room/room.gateway");
const dataSource_1 = require("./database/dataSource");
const error_handler_middleware_1 = __importDefault(require("./common/middleware/error-handler.middleware"));
const user_router_1 = require("./user/user.router");
const auth_router_1 = require("./auth/auth.router");
const post_router_1 = require("./posts/post.router");
const comment_router_1 = require("./comment/comment.router");
const like_router_1 = require("./like/like.router");
const company_router_1 = require("./company/company.router");
const job_router_1 = require("./job/job.router");
const recommendation_router_1 = require("./recommendation/recommendation.router");
const job_application_router_1 = require("./job-application/job-application.router");
const job_saved_router_1 = require("./job-saved/job-saved.router");
const s3_document_router_1 = require("./s3-document/s3-document.router");
const ses_router_1 = require("./email/ses.router");
const logger = (0, pino_1.pino)({ name: 'server start' });
exports.logger = logger;
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, '../.env'),
});
dataSource_1.dataSource
    .initialize()
    .then(() => {
    logger.info('Database connected');
})
    .catch((error) => {
    logger.error(error);
});
const app = (0, express_1.default)();
exports.app = app;
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get('/helloWorld', (req, res) => {
    res.send('Hello World :p');
});
app.use('/user', user_router_1.userRouter);
app.use('/auth', auth_router_1.authRouter);
app.use('/post', post_router_1.postRouter);
app.use('/comment', comment_router_1.commentRouter);
app.use('/like', like_router_1.likeRouter);
app.use('/company', company_router_1.companyRouter);
app.use('/job', job_router_1.jobRouter);
app.use('/recommendation', recommendation_router_1.recommendationRouter);
app.use('/job-application', job_application_router_1.jobApplicationRouter);
app.use('/job-saved', job_saved_router_1.jobSavedRouter);
app.use('/s3-document', s3_document_router_1.s3DocumentRouter);
app.use('/ses', ses_router_1.sesRouter);
app.use((0, error_handler_middleware_1.default)());
//# sourceMappingURL=server.js.map