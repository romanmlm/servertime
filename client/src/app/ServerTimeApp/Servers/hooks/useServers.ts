import { useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { ServerItem } from "../ServerItem";
import { GET_SERVERS } from "./graphql/getServers.gql";
import { SERVERS_CHANGED } from "./graphql/onServersChanged.gql";
import { GetServers } from "./graphql/__generated__/GetServers";
import { onServersChanged } from "./graphql/__generated__/onServersChanged";

export function useServers(): ServerItem[] {
  const { data, subscribeToMore } = useQuery(GET_SERVERS);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
        document: SERVERS_CHANGED,
        updateQuery: (prev: GetServers, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const { serversChanged: {added, removed, updated} } = subscriptionData.data;
          const removedSet = new Set(removed);
          const updatedSet = new Set(updated.map((u: ServerItem) => u.id))
          let result = prev.servers.filter(s => !removedSet.has(s.id) && !updatedSet.has(s.id));
          const servers: ServerItem[] = [...result, ...added, ...updated];
          return {...prev, servers};
        }
      });
      return () => unsubscribe && unsubscribe();
  }, [subscribeToMore])

  return useMemo(() => {
    if (data?.servers) {
      const servers: ServerItem[] = data.servers.map(({ id, name }: ServerItem) => ({
        id,
        name,
      }));
      return servers;
    }
    return [];
  }, [data]);
}
