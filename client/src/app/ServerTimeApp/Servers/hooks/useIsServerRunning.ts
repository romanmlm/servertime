import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { IS_SERVER_RUNNING } from "./graphql/isServerRunning.gql";
import { IsServerRunning, IsServerRunningVariables } from "./graphql/__generated__/IsServerRunning";

export function useIsServerRunning(id: string) {
    const {data} = useQuery<IsServerRunning, IsServerRunningVariables>(IS_SERVER_RUNNING, {variables: {id}});

    return useMemo(() => {
        return data?.server?.running ?? false;
    }, [data]);
}