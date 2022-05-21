import { Typography } from "@material-ui/core";
import React from "react";
import { FormattedDate } from "react-intl";
import { useServerTime } from "./useServerTime";

const ServerTime: React.FC = () => {
  const serverTime = useServerTime();
  console.log(`server time: ${serverTime}`);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Typography variant="h1">
        {(serverTime && (<FormattedDate
          value={serverTime}
          day="2-digit"
          month="long"
          year="numeric"
          hour="2-digit"
          minute="2-digit"
          second="2-digit"
        />)) || 'Retrieving Server Time ...'}
      </Typography>
    </div>
  );
};

export default ServerTime;
