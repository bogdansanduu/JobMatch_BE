import passport from 'passport';
import passportJwt from 'passport-jwt';
import 'dotenv';

import { dataSource } from '../database/dataSource';
import { User } from '../user/entities/user.entity';

const Strategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const userRepo = dataSource.getRepository(User);

//TODO add interface for jwt payload
passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET || 'access',
    },
    async (payload, done) => {
      const user = await userRepo.findOne({
        where: {
          id: payload.userId,
        },
      });

      if (!user) {
        return done(new Error('User not found'), null);
      }

      return done(null, user);
    }
  )
);
