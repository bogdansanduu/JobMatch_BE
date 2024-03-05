import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import dotenv from 'dotenv';

import { ENTITIES } from './entities';
import * as process from 'process';

//FIGURE OUT WHY NEEDED
dotenv.config();

const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = parseInt(process.env.DB_PORT || '3306');
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'root';
const DB_DATABASE = process.env.DB_DATABASE || 'test';

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
