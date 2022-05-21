import { Typography } from "@material-ui/core";
import React, { FC } from "react";
import { useServerTick } from "./hooks/useServerTick";

export const ServerTick: FC<{id: string}> = ({id}) => {
    const tick = useServerTick(id);
    return (
        <Typography variant="h6">
            {tick}
        </Typography>
    );
};