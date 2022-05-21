import { gql } from 'apollo-server';

export const Response = gql`
  interface Response {
    success: Boolean!
    message: String
  }
`;

export const Status = gql`
  type Status implements Response {
    success: Boolean!
    message: String
  }
`;
