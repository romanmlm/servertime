import { NatsPubSub } from '@moonwalker/graphql-nats-subscriptions';
import { ServiceTypes } from '../../serviceTypes';
import { config } from '../../config';
import { logger } from '../../logger';

const getPubSub = (
  serviceType: ServiceTypes,
  address: string,
  tlsCertPath?: string,
  tlsKeyPath?: string,
  tlsCaPath?: string
) => {
  logger.debug(`serviceType: ${serviceType}`);
  switch (serviceType) {
    default:
      const pubSubConfig = {
        servers: [address],
        tls: tlsCertPath
          ? {
              certFile: tlsCertPath,
              keyFile: tlsKeyPath || undefined,
              caFile: tlsCaPath || undefined,
              rejectUnauthorized: false
            }
          : undefined
      };
      if (pubSubConfig.tls)
        logger.debug(
          `Connecting to NATS on ${pubSubConfig.servers[0]} using TLS`
        );
      else
        logger.debug(
          `Connecting to NATS on ${pubSubConfig.servers[0]} using unsecured channel`
        );
      return new NatsPubSub(pubSubConfig);
  }
};

export const withCleanup = (asyncIterator: any, cleanup?: () => void) => {
  const asyncReturn = asyncIterator.return;

  asyncIterator.return = () => {
    cleanup && cleanup();
    return asyncReturn
      ? asyncReturn.call(asyncIterator)
      : Promise.resolve({ value: undefined, done: true });
  };

  return asyncIterator;
};

export const subscriberWithCleanup = (
  subscribe: () => any,
  asyncIterator: any
) => {
  const cleanup = subscribe();

  return withCleanup(asyncIterator, cleanup);
};

export default getPubSub(
  config.serviceType,
  config.services.pubSubService.path,
  config.services.pubSubService.tlsCertPath,
  config.services.pubSubService.tlsKeyPath,
  config.services.pubSubService.tlsCaPath
);
