/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: onServerTimeChanged
// ====================================================

export interface onServerTimeChanged_serverTimeChanged {
  __typename: "ServerTime";
  time: string;
}

export interface onServerTimeChanged {
  serverTimeChanged: onServerTimeChanged_serverTimeChanged;
}

export interface onServerTimeChangedVariables {
  id: string;
}
