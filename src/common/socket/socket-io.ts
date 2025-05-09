import * as http from 'http';
import { Server } from 'socket.io';
import passport from 'passport';

import { app } from '../../server';
import { dataSource } from '../../database/dataSource';
import { User } from '../../user/entities/user.entity';
import { HttpException } from '../exceptions/http.exception';
import { getEnvVar } from '../utils/envConfig';

const ioSocket = new Server(http.createServer(app), {
  cors: {
    origin: getEnvVar<string>('CORS_ORIGIN', 'string'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    // allowedHeaders: ['Authorization', 'Content-Type'],
    optionsSuccessStatus: 204,
  },
});
const userRepository = dataSource.getRepository<User>(User);

ioSocket.use((socket, next) => {
  if (socket.request.headers.authorization) {
    passport.authenticate('jwt', { session: false }, (err, payload) => {
      if (err || !payload) {
        return next(new HttpException('Authentication error', 401));
      }

      next();
    })(socket.request, {}, next);

    return;
  }

  next(new HttpException('Authentication error', 401));
});

//updates the socket id of the user in the database
ioSocket.use(async (socket, next) => {
  const userId = parseInt(socket.handshake.query.userId as string);

  if (!userId) {
    next();
    return;
  }

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    next();
    return;
  }

  user.socketId = socket.id;
  await userRepository.save(user);

  next();
});

ioSocket.on('connection', (socket) => {
  console.log(`User connected with socket id ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`User disconnected with socket id ${socket.id}`);
  });
});

export default ioSocket;
