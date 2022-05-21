import { IconButton } from "@material-ui/core";
import React, { FC, useCallback } from "react";
import StopIcon from '@material-ui/icons/StopRounded';
import { useStopServer } from "./hooks/useStopServer";

export const StopServer: FC<{id: string}> = ({id}) => {
    const stopServer = useStopServer();
    const handleStopServer = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        stopServer(id);
    }, [stopServer, id]);
    return (
        <IconButton color="primary" onClick={handleStopServer}>
            <StopIcon/>
        </IconButton>
    );
};