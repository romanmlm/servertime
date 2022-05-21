import { gql } from '@apollo/client';

export const REMOVE_SERVER = gql`
  mutation RemoveServer($id: ID!) {
    removeServer(id: $id)
  }
`;
