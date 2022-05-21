import { SystemTimeDataSource } from '@data/dataSources';
import { getSystemTime } from '@api/nats';
import { SystemTime } from '@data/domainTypes';

export class NatsSystemTimeDataSource implements SystemTimeDataSource {
  async getSystemTime(): Promise<SystemTime> {
    return await getSystemTime();
  }
}
