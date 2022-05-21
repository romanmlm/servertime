import { formatMessage } from "@formatjs/intl";
import { Grid, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, { FC, useCallback, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { ADD_SERVER, SERVER_NAME } from "translations/stringIds";
import { useAddServer } from "./hooks";

export const AddServer: FC = () => {
    const {formatMessage} = useIntl();
    const addServer = useAddServer();
    const [serverName, setServerName] = useState('');
    const handleAddServer = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addServer(serverName);
    }, [addServer, serverName]);
    return (
        <form onSubmit={handleAddServer}>
            <Grid container direction="row">
                <Grid item container xs={11}>
                    <Button variant="contained" color="primary" type="submit">
                        <FormattedMessage id={ADD_SERVER}/>
                    </Button>
                </Grid>
                <Grid item container xs={11}>
                    <TextField id="serverName" label={formatMessage({id: SERVER_NAME})} type="text" onChange={e => setServerName(e.target.value)}/>
                </Grid>
            </Grid>
        </form>
    );
}