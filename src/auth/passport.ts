import passport from 'passport';
import passportJwt from 'passport-jwt';
import 'dotenv';

import { dataSource } from '../database/dataSource';
import { User } from '../user/entities/user.entity';
import { Company } from '../company/entities/company.entity';
import { getEnvVar } from '../common/utils/envConfig';

const Strategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const userRepo = dataSource.getRepository(User);
const companyRepo = dataSource.getRepository(Company);

//TODO add interface for jwt payload
passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: getEnvVar<string>('ACCESS_TOKEN_SECRET', 'string'),
    },
    async (payload, done) => {
      let user: User | null = null;
      let company: Company | null = null;

      if (payload.userId) {
        user = await userRepo.findOne({
          where: {
            id: payload.userId,
          },
        });
      }

      if (payload.companyId) {
        company = await companyRepo.findOne({
          where: {
            id: payload.companyId,
          },
        });
      }

      if (!user && !company) {
        return done(new Error('Invalid token'), null);
      }

      if (user) {
        return done(null, user);
      }
      if (company) {
        return done(null, company);
      }
    }
  )
);
