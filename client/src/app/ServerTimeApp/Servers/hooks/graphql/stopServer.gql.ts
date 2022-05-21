import { gql } from '@apollo/client';

export const STOP_SERVER = gql`
  mutation StopServer($id: ID!) {
    stopServer(id: $id)
  }
`;
