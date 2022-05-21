import { IconButton } from "@material-ui/core";
import React, { FC, useCallback } from "react";
import StartIcon from '@material-ui/icons/PlayArrowRounded';
import { useStartServer } from "./hooks/useStartServer";

export const StartServer: FC<{id: string}> = ({id}) => {
    const startServer = useStartServer();
    const handleStartServer = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        startServer(id);
    }, [startServer, id]);
    return (
        <IconButton color="primary" onClick={handleStartServer}>
            <StartIcon/>
        </IconButton>
    );
};