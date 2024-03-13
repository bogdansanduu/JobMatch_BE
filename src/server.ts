import express, { Express, Request, Response } from 'express';
import 'reflect-metadata';
import path from 'path';
import { pino } from 'pino';
import dotenv from 'dotenv';
import './auth/passport';

import { dataSource } from './database/dataSource';
import errorHandler from './common/middleware/errorHandler';

import { userRouter } from './user/user.router';
import { authRouter } from './auth/auth.router';

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

const app: Express = express();

//allow cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//puts the parsed request body in req.body
app.use(express.json());

// Request logging
//app.use(requestLogger());

// Routes

app.get('/helloWorld', (req: Request, res: Response) => {
  res.send('Hello World :p');
});

app.use('/users', userRouter);
app.use('/auth', authRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
