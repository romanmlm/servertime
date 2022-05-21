import { useMutation, useSubscription } from "@apollo/client";
import { useCallback, useMemo } from "react";
import { SERVER_TICK } from "./graphql/onServerTick.gql";
import {
  onServerTick,
  onServerTickVariables,
} from "./graphql/__generated__/onServerTick";

export function useServerTick(id: string) {
  const { data } = useSubscription<onServerTick, onServerTickVariables>(
    SERVER_TICK,
    { variables: { id } }
  );

  return useMemo(() => data?.serverTick ?? 0, [data]);
}
