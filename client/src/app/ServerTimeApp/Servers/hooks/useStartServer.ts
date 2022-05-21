import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import { START_SERVER } from "./graphql/startServer.gql";
import {
  StartServer,
  StartServerVariables,
} from "./graphql/__generated__/StartServer";

export function useStartServer() {
  const [startServer] = useMutation<StartServer, StartServerVariables>(START_SERVER);

  return useCallback(
    async (id: string) => {
      try {
        const startServerResponse = await startServer({ variables: { id } });
        if (startServerResponse?.data) {
          return startServerResponse.data.startServer;
        } else if (startServerResponse.errors) {
          console.log(startServerResponse.errors);
        }
        return false;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    [startServer]
  );
}
