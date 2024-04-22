import express, { Express, Request, Response } from 'express';
import 'reflect-metadata';
import path from 'path';
import { pino } from 'pino';
import dotenv from 'dotenv';
import './auth/passport';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import './chat/message/message.gateway';
import './chat/room/room.gateway';

import { dataSource } from './database/dataSource';
import errorHandler from './common/middleware/error-handler.middleware';

import { userRouter } from './user/user.router';
import { authRouter } from './auth/auth.router';
import { postRouter } from './posts/post.router';
import { likeRouter } from './like/like.router';

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

//allow cors
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
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
app.use('/like', likeRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
