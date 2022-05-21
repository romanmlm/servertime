import Grid from "@material-ui/core/Grid";
import React, { FC, useMemo } from "react";
import { AddServer } from "./AddServer";
import { useServers } from "./hooks";
import { Server } from "./Server";
import { ServerItem } from "./ServerItem";

export const Servers: FC = () => {
    const serverItems: ServerItem[] = useServers();
    const servers = useMemo(() => {
        return serverItems.map(item => (
        <Grid item xs={3} key={item.id}>
            <Server {...item}/>
        </Grid>));
    }, [serverItems]);

    return (
        <Grid container direction="column" justifyContent="flex-start">
            <Grid item xs={3}>
                <AddServer/>
            </Grid>
            {servers}
      </Grid>
    );
};