import { config } from './config';
import { logger } from './logger';
import createServer from '@gc-apollo/server';
import { combineDataSources } from '@data/dataSources';
import { combineSubscribers } from '@data/subscribers';

export const runServer = async () => {
  const dataSources = combineDataSources(config.serviceType);
  const subscribers = combineSubscribers(config.serviceType);

  const server = createServer(config, dataSources, subscribers);

  try {
    const { url, subscriptionsUrl } = await server.listen({
      host: config.apolloServer.address,
      port: config.apolloServer.port
    });
    logger.info(`GraphQL server is running on ${url}`);
    logger.info(`Subscriptions are running on ${subscriptionsUrl}`);
  } catch (error) {
    logger.error('Failed to run apollo server');
    logger.error(error);
  }
};
