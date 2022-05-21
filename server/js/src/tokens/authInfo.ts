import decodeToken from './decodeToken';
import { logger } from '../logger';

export const getTokenInfo = async (
  token: any,
  jwksEndpoint: string,
  tlsCert?: Buffer
) => {
  if (!token) return { authorization: { accessToken: null, token } };

  try {
    const accessToken = await decodeToken(token, jwksEndpoint, tlsCert);
    return { authorization: { accessToken, token } };
  } catch (err) {
    logger.error(err);
    return { authorization: { accessToken: null, token: null } };
  }
};
