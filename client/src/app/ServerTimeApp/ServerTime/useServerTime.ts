import { useQuery, useSubscription } from '@apollo/client';
import { useEffect } from 'react';
import { GetServerTime, GET_SERVER_TIME, onServerTime } from './graphql';
import { SERVER_TIME_EVENT } from './graphql/onServerTimeEvent.g';

export function useServerTime() {
  const id = '1'
  const { data, subscribeToMore } = useQuery<GetServerTime>(GET_SERVER_TIME, {
    variables: { id }
  });

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: SERVER_TIME_EVENT,
      variables: { id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data)return prev;
        const { serverTime } = subscriptionData.data;
        return {
          ...prev,
          serverTime: {
            ...prev.serverTime,
            time: serverTime.time
          }
        }
      }
    });
    return () => unsubscribe && unsubscribe();
  }, [subscribeToMore]);

  return data?.serverTime?.time;
}
