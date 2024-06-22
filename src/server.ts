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
  origin: getEnvVar<string>('CORS_ORIGIN', 'string'), // Allow your React app's origin
  credentials: true, // Access-Control-Allow-Credentials: true
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Authorization', 'Content-Type'], // Allow Authorization and Content-Type headers
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight response for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

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
