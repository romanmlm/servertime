import { gql } from 'apollo-server';

export const SystemTime = gql`
  type SystemTime {
    time: String!
  }
`;

export const SystemTimeQuery = gql`
  extend type Query {
    systemTime: SystemTime!
  }
`;

export const SystemTimeEvent = gql`
  extend type Subscription {
    systemTimeEvent: String!
  }
`;
