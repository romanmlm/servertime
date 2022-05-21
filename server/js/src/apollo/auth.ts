import { AuthenticationError, ForbiddenError } from 'apollo-server';
import { logger } from '../logger';

export const authenticate = (accessToken: any) => {
  if (!accessToken) {
    logger.error('User not authenticated');
    throw new AuthenticationError('User not authenticated');
  }
};

export const authorizeCurrentUser = (
  accessToken: { sub: any },
  userId: any
) => {
  authenticate(accessToken); // throw if no token
  if (userId != accessToken.sub) {
    logger.error('Unauthorized');
    throw new ForbiddenError('Unauthorized');
  }
};

export const authorizeClaim = (accessToken: any, claim: string) => {
  logger.info('claim :', accessToken.ext[claim]);
  if (!(accessToken && accessToken.ext[claim]))
    throw new ForbiddenError('Unauthorized');
};
