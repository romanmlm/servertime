import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import { STOP_SERVER } from "./graphql/stopServer.gql";
import {
  StopServer,
  StopServerVariables,
} from "./graphql/__generated__/StopServer";

export function useStopServer() {
  const [stopServer] = useMutation<StopServer, StopServerVariables>(STOP_SERVER);

  return useCallback(
    async (id: string) => {
      try {
        const stopServerResponse = await stopServer({ variables: { id } });
        if (stopServerResponse?.data) {
          return stopServerResponse.data.stopServer;
        } else if (stopServerResponse.errors) {
          console.log(stopServerResponse.errors);
        }
        return false;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    [stopServer]
  );
}
