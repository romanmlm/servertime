import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import { REMOVE_SERVER } from "./graphql/removeServer.gql";
import {
  RemoveServer,
  RemoveServerVariables,
} from "./graphql/__generated__/RemoveServer";

export function useRemoveServer() {
  const [removeServer] = useMutation<RemoveServer, RemoveServerVariables>(REMOVE_SERVER);

  return useCallback(
    async (id: string) => {
      try {
        const removeServerResponse = await removeServer({ variables: { id } });
        if (removeServerResponse?.data) {
          return removeServerResponse.data.removeServer;
        } else if (removeServerResponse.errors) {
          console.log(removeServerResponse.errors);
        }
        return false;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    [removeServer]
  );
}
