export interface PubSubNotification<TTopic, TPayload> {
  topic: TTopic;
  payload: TPayload;
}
