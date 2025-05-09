import express, { Express, Request, Response } from 'express';
import 'reflect-metadata';
import path from 'path';
import { pino } from 'pino';
import dotenv from 'dotenv';
import './auth/passport';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';

import './common/s3/s3';
import './chat/message/message.gateway';
import './chat/room/room.gateway';

import { dataSource } from './database/dataSource';
import errorHandler from './common/middleware/error-handler.middleware';

import { userRouter } from './user/user.router';
import { authRouter } from './auth/auth.router';
import { postRouter } from './posts/post.router';
import { commentRouter } from './comment/comment.router';
import { likeRouter } from './like/like.router';
import { companyRouter } from './company/company.router';
import { jobRouter } from './job/job.router';
import { recommendationRouter } from './recommendation/recommendation.router';
import { jobApplicationRouter } from './job-application/job-application.router';
import { jobSavedRouter } from './job-saved/job-saved.router';
import { s3DocumentRouter } from './s3-document/s3-document.router';
import { sesRouter } from './email/ses.router';
import { getEnvVar } from './common/utils/envConfig';

const logger = pino({ name: 'server start' });

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

dataSource
  .initialize()
  .then(() => {
    logger.info('Database connected');
  })
  .catch((error) => {
    logger.error(error);
  });

//create express app
const app: Express = express();

app.use(helmet());

// //allow cors
const corsOptions: CorsOptions = {
  origin: [
    getEnvVar<string>('CORS_ORIGIN', 'string'),
    getEnvVar<string>('FASTAPI_SERVER_URL', 'string'),
    'https://railway.app',
  ], // Allow your React app's origin
  // credentials: true, // Access-Control-Allow-Credentials: true (if you need to send cookies or HTTP authentication)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  // allowedHeaders: ['Authorization', 'Content-Type'],
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

//UNCOMMENT IN CASE NOT READING LOG PASSPORT STRATEGY
// app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
// app.use(bodyParser.json()); // parse application/json

//puts the parsed request body in req.body
app.use(express.json());

//middleware for parsing cookies
app.use(cookieParser());

// Request logging
//app.use(requestLogger());

// Routes

app.get('/helloWorld', (req: Request, res: Response) => {
  res.send('Hello World :p');
});

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
app.use('/like', likeRouter);
app.use('/company', companyRouter);
app.use('/job', jobRouter);
app.use('/recommendation', recommendationRouter);
app.use('/job-application', jobApplicationRouter);
app.use('/job-saved', jobSavedRouter);
app.use('/s3-document', s3DocumentRouter);
app.use('/ses', sesRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
