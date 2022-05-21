import { SystemTime } from '@data/domainTypes';

export interface SystemTimeDataSource {
  getSystemTime(): Promise<SystemTime>;
}
