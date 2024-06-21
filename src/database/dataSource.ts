import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import dotenv from 'dotenv';

import { ENTITIES } from './entities';
import { getEnvVar } from '../common/utils/envConfig';

//FIGURE OUT WHY NEEDED
dotenv.config();

const DB_HOST = getEnvVar<string>('DB_HOST', 'string');
const DB_PORT = getEnvVar<number>('DB_PORT', 'number');
const DB_USER = getEnvVar<string>('DB_USER', 'string');
const DB_PASSWORD = getEnvVar<string>('DB_PASSWORD', 'string');
const DB_DATABASE = getEnvVar<string>('DB_DATABASE', 'string');

export const dataSource = new DataSource({
  type: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,

  synchronize: true,
  entities: ENTITIES,
  migrations: [`${__dirname}/migrations/*.ts`],
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
});

console.log(__dirname);
