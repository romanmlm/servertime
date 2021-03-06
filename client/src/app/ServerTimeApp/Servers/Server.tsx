import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { FC } from "react";
import { RemoveServer } from "./RemoveServer";
import { ServerTick } from "./ServerTick";
import { StartServer } from "./StartServer";
import { StopServer } from "./StopServer";

type ServerProps = { id: string; name: string };

export const Server: FC<ServerProps> = ({ id, name }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h3">{name}</Typography>
        <ServerTick id={id} />
      </CardContent>
      <CardActions>
        <StartServer id={id} />
        <StopServer id={id} />
        <RemoveServer id={id} />
      </CardActions>
    </Card>
  );
};
