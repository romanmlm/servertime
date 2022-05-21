import { gql } from '@apollo/client';

export const SERVERS_CHANGED = gql`
  subscription onServersChanged {
    serversChanged {
        added {
            id
            name
        }
        removed
        updated {
            id
            name
        }
    }
  }
`;
