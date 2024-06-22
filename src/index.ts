import 'reflect-metadata';

import { app, logger } from './server';
import ioSocket from './common/socket/socket-io';
import { getEnvVar } from './common/utils/envConfig';
import http from 'http';

const appPort = getEnvVar<number>('PORT', 'number');
// const socketPort = getEnvVar<number>('SOCKET_PORT', 'number');

const server = http.createServer(app);
ioSocket.listen(server);

server.listen(appPort, '0.0.0.0', () => {
  logger.info(`Server is running on port ${appPort}`);
});
