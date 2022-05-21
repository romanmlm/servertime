import { gql } from '@apollo/client';

export const ADD_SERVER = gql`
  mutation AddServer($name: String!) {
    addServer(name: $name) {
        id
      }
  }
`;
