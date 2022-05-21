import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
  ApolloLink,
  split,
  Operation
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { Config } from '../../../config';

const cache = new InMemoryCache();

const httpLink = (config: Config) =>
  new HttpLink({
    uri: config.uris.apiUri
  });

const wsLink = (config: Config) =>
  new WebSocketLink({
    uri: config.uris.wsSubscriptionsUri,
    options: {
      reconnect: true
    }
  });

const getLink = (config: Config) =>
  split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink(config),
    httpLink(config)
  );

const createApolloClient = (config: Config) => {
  return new ApolloClient<NormalizedCacheObject>({
    cache,
    link: getLink(config)
  });
};

export default createApolloClient;
