/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IsServerRunning
// ====================================================

export interface IsServerRunning_server {
  __typename: "Server";
  id: string;
  running: boolean;
}

export interface IsServerRunning {
  server: IsServerRunning_server | null;
}

export interface IsServerRunningVariables {
  id: string;
}
