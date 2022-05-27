import Grid from "@material-ui/core/Grid";
import React, { FC, useMemo } from "react";
import { AddServer } from "./AddServer";
import { useServers } from "./hooks";
import { Server } from "./Server";
import { ServerItem } from "./ServerItem";

export const Servers: FC = () => {
  const serverItems: ServerItem[] = useServers();
  const servers = useMemo(() => {
    return serverItems.map((item) => (
      <Grid item xs={1} key={item.id}>
        <Server {...item} />
      </Grid>
    ));
  }, [serverItems]);

  return (
    <Grid container spacing={2} direction="column" justifyContent="flex-start">
      <Grid item xs={4}>
        <AddServer />
      </Grid>
      <Grid container spacing={3} direction="row">
        {servers}
      </Grid>
    </Grid>
  );
};
