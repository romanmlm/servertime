import pubsub from './pubsub';
import { PubSubNotification } from './PubSubNotification';

export const publish = <TTopic, TPayload>(
  notification: PubSubNotification<TTopic, TPayload>
): Promise<void> => {
  const { topic, payload } = notification;
  return pubsub.publish(String(topic), payload);
};
