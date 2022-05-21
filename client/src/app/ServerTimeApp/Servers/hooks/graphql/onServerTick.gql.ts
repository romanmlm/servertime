import { gql } from '@apollo/client';

export const SERVER_TICK = gql`
  subscription onServerTick($id: ID!) {
    serverTick(id: $id)
  }
`;
