/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: onServersChanged
// ====================================================

export interface onServersChanged_serversChanged_added {
  __typename: "Server";
  id: string;
  name: string;
}

export interface onServersChanged_serversChanged_updated {
  __typename: "Server";
  id: string;
  name: string;
}

export interface onServersChanged_serversChanged {
  __typename: "ServersChanged";
  added: onServersChanged_serversChanged_added[];
  removed: string[];
  updated: onServersChanged_serversChanged_updated[];
}

export interface onServersChanged {
  serversChanged: onServersChanged_serversChanged;
}
