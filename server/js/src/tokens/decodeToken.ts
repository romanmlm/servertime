import jwksRsa from 'jwks-rsa';
import jwt, { JwtHeader, Secret } from 'jsonwebtoken';
import * as https from 'https';

const decodeToken = async (
  token: string,
  jwksEndpoint: string,
  tlsCert?: Buffer
) => {
  const requestAgent =
    tlsCert &&
    new https.Agent({
      ca: tlsCert
    });

  const client = jwksRsa({
    jwksUri: jwksEndpoint,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    requestAgent
  });

  const getKey = (
    header: JwtHeader,
    callback: (_err: any, signingKey: Secret) => void
  ) => {
    client.getSigningKey(header.kid ?? '', (_err, key) => {
      const publicKey = key?.getPublicKey();
      callback(null, publicKey);
    });
  };

  return new Promise((resolve, reject) => {
    jwt.verify(token, getKey, { ignoreExpiration: false }, (err, decoded) => {
      if (err) reject(err);
      else {
        resolve(decoded);
      }
    });
  });
};

export default decodeToken;
