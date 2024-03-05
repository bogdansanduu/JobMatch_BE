import { EntitySchema, MixedList } from 'typeorm';
import { User } from '../user/entities/user.entity';

export const ENTITIES: MixedList<string | Function | EntitySchema<any>> = [User];
