import { gql } from '@apollo/client';

export const GET_SERVERS = gql`
  query GetServers {
    servers {
        id
        name
      }
  }
`;
