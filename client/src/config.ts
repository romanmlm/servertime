const windowAny: any = window;

const baseUris = {
  api: windowAny?.REACT_APP_BASE_API_URL || 'http://localhost:4000',
  wsSubscriptions:
    windowAny?.REACT_APP_WS_SUBSCRIPTIONS_URL || 'ws://localhost:4000/graphql'
};

export interface Config {
  uris: {
    apiUri: string;
    wsSubscriptionsUri: string;
  };
}

export const config: Config = {
  uris: {
    apiUri: `${baseUris.api}`,
    wsSubscriptionsUri: `${baseUris.wsSubscriptions}`
  }
};
