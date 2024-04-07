import { EntitySchema, MixedList } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Token } from '../auth/entities/token.entity';
import { Message } from '../chat/message/entity/message.entity';
import { Room } from '../chat/room/entities/room.entity';
import { UserToRoom } from '../chat/room/entities/user-to-room.entity';

export const ENTITIES: MixedList<string | Function | EntitySchema<any>> = [User, Token, Message, Room, UserToRoom];
