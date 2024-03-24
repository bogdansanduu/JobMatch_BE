import { DeleteResult } from 'typeorm';

import { Token } from '../entities/token.entity';
import { User } from '../../user/entities/user.entity';

export interface TokenRepositoryInterface {
  createToken: (token: any) => Promise<Token>;
  getTokenByName: (token: string) => Promise<Token | null>;
  deleteTokensByUser: (user: User) => Promise<DeleteResult>;
  deleteTokenByName: (token: string) => Promise<DeleteResult>;
}
