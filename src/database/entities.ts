import { EntitySchema, MixedList } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Token } from '../auth/entities/token.entity';

export const ENTITIES: MixedList<string | Function | EntitySchema<any>> = [User, Token];
