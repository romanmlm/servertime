import { CleanupCallback } from '@data/domainTypes';
import { SubscriberInfo } from './SubscriberInfo';

export class SubscriberTable {
  private subscriberTable = new Map<any, SubscriberInfo>();

  addSubscriber = (key: any, subscribeWithCleanup: () => CleanupCallback) => {
    let subscriberInfo = this.subscriberTable.get(key);
    if (!subscriberInfo) {
      const removeSubscriberEntry = (() =>
        this.subscriberTable.delete(key)).bind(this);
      subscriberInfo = new SubscriberInfo(
        subscribeWithCleanup(),
        removeSubscriberEntry
      );
      this.subscriberTable.set(key, subscriberInfo);
    } else {
      subscriberInfo.addSubscriber();
    }
  };

  cleanupCallback = (key: any) => {
    const subscriberInfo = this.subscriberTable.get(key);
    return subscriberInfo?.removeSubscriber;
  };
}
