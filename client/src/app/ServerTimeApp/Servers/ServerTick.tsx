import { Typography } from "@material-ui/core";
import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import { NOT_RUNNING } from "translations/stringIds";
import { useIsServerRunning } from "./hooks/useIsServerRunning";
import { useServerTick } from "./hooks/useServerTick";

export const ServerTick: FC<{ id: string }> = ({ id }) => {
  const tick = useServerTick(id);
  const isRunning = useIsServerRunning(id);
  if (isRunning)
    return <Typography variant="h3">{tick}</Typography>;
  return <Typography variant="h6"><FormattedMessage id={NOT_RUNNING}/></Typography>;
};
