import { gql } from '@apollo/client';

export const SERVER_TIME_EVENT = gql`
  subscription onServerTimeChanged($id: ID!) {
    serverTimeChanged(id: $id) {
      time
    }
  }
`;
