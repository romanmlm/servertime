import { useMutation } from "@apollo/client";
import { useCallback, useMemo } from "react";
import { ServerItem } from "../ServerItem";
import { ADD_SERVER } from "./graphql/addServer.gql";
import {
  AddServer,
  AddServerVariables,
} from "./graphql/__generated__/AddServer";

export function useAddServer() {
  const [addServer] = useMutation<AddServer, AddServerVariables>(ADD_SERVER);

  return useCallback(
    async (name: string) => {
      try {
        const addServerResponse = await addServer({ variables: { name } });
        if (addServerResponse?.data) {
          const serverItem: ServerItem = {
            id: addServerResponse.data.addServer.id,
            name,
          };
          return serverItem;
        } else if (addServerResponse.errors) {
          console.log(addServerResponse.errors);
        }
        return null;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
    [addServer]
  );
}
