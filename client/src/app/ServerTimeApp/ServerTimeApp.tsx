import React from 'react';

import { ApolloProvider } from '@apollo/client';
import createApolloClient from './apollo/client';
import { Config } from '../../config';
import ServerTime from './ServerTime/ServerTime';
import { Servers } from './Servers';

const ServerTimeApp: React.FC<{config: Config}> = ({ config }) => {
  return (
      <ApolloProvider client={createApolloClient(config)}>
        <Servers/>
      </ApolloProvider>
  );
};

export default ServerTimeApp;
