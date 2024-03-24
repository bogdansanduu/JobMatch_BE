import { Repository } from 'typeorm';
import { injectable } from 'inversify';

import { Token } from './entities/token.entity';
import { dataSource } from '../database/dataSource';
import { User } from '../user/entities/user.entity';
import { TokenRepositoryInterface } from './interfaces/token-repository.interface';

@injectable()
export class TokenRepository implements TokenRepositoryInterface {
  private readonly tokenRepo: Repository<Token>;

  constructor() {
    this.tokenRepo = dataSource.getRepository(Token);
  }

  createToken(tokenData: { refreshToken: string; user: User }) {
    const token = this.tokenRepo.create(tokenData);

    return this.tokenRepo.save(token);
  }

  deleteTokensByUser(user: User) {
    return this.tokenRepo.delete({
      user,
    });
  }

  deleteTokenByName(refreshToken: string) {
    return this.tokenRepo.delete({
      refreshToken,
    });
  }

  getTokenByName(refreshToken: string) {
    return this.tokenRepo.findOne({
      where: {
        refreshToken,
      },
      relations: ['user'],
    });
  }
}
