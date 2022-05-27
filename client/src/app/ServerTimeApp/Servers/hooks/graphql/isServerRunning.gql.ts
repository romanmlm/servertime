import { gql } from '@apollo/client';

export const IS_SERVER_RUNNING = gql`
  query IsServerRunning($id: ID!) {
    server(id: $id) {
        id
        running
      }
  }
`;
