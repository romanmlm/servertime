import { CleanupCallback } from '@data/domainTypes';

export class SubscriberInfo {
  private count = 1;

  private cleanupCallback: CleanupCallback | null = null;

  private onSubscribersRemoved?: () => void;

  constructor(cleanup: CleanupCallback, onSubscribersRemoved?: () => void) {
    if (cleanup) this.cleanupCallback = cleanup;
    if (onSubscribersRemoved) this.onSubscribersRemoved = onSubscribersRemoved;
    this.addSubscriber = this.addSubscriber.bind(this);
    this.removeSubscriber = this.removeSubscriber.bind(this);
  }

  addSubscriber = () => {
    this.count++;
  };

  removeSubscriber = () => {
    if (!this) return;

    if (this.count > 0) this.count--;

    if (this.count === 0 && this.cleanupCallback) {
      this.cleanupCallback();
      this.onSubscribersRemoved && this.onSubscribersRemoved();
    }
  };
}
