import { env } from 'process';

export const jwtConstants = {
  secret: env['JWT_SECRET'],
  rt_secret: env['REFRESH_TOKEN_SECRET'],
};
