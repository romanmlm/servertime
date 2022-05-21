import { gql } from '@apollo/client';

export const START_SERVER = gql`
  mutation StartServer($id: ID!) {
    startServer(id: $id)
  }
`;
