import { Grid, Typography } from "@material-ui/core";
import React, { FC } from "react";
import { RemoveServer } from "./RemoveServer";
import { ServerTick } from "./ServerTick";
import { StartServer } from "./StartServer";
import { StopServer } from "./StopServer";

type ServerProps = { id: string; name: string; };

export const Server: FC<ServerProps> = ({id, name}) => {
    return (
        <Grid container direction="row">
            <Grid item container xs={11}>
                <RemoveServer id={id} />
                <StartServer id={id} />
                <StopServer id={id} />
                <Typography variant="h6">
                    {name}
                </Typography>
                <ServerTick id={id} />
            </Grid>
        </Grid>
    );
};