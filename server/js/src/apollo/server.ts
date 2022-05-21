import { ApolloServer } from 'apollo-server';

import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { Config } from '../config';
import { DataSources } from '@data/dataSources';
import { ApolloSystemTimeDataSource } from '@data/dataSources/apollo';

type Subscribers = {
  someSubscriber: any;
};

const createServer = (
  config: Config,
  { systemTimeDataSource }: DataSources,
  subscribers: Subscribers
): ApolloServer => {
  const apolloDataSources = {
    systemTimeDataSource: new ApolloSystemTimeDataSource(systemTimeDataSource)
  };
  return new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => apolloDataSources,
    context: async () => {
      return {
        apolloDataSources,
        subscribers
      };
    },
    uploads: false,
    playground: config.showPlayground
  });
};

export default createServer;
