import { Button, Grid, IconButton, Typography } from "@material-ui/core";
import React, { FC, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { REMOVE_SERVER } from "translations/stringIds";
import { useRemoveServer } from "./hooks";
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import StartIcon from '@material-ui/icons/PlayArrowRounded';

export const RemoveServer: FC<{id: string}> = ({id}) => {
    const removeServer = useRemoveServer();
    const handleRemoveServer = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        removeServer(id);
    }, [removeServer, id]);
    return (
        <IconButton color="secondary" onClick={handleRemoveServer}>
            <DeleteIcon/>
        </IconButton>
    );
};