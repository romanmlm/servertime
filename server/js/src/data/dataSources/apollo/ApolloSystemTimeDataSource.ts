import { DataSource } from 'apollo-datasource';
import { SystemTimeDataSource } from '@data/dataSources';
import { SystemTime } from '@data/domainTypes';

export class ApolloSystemTimeDataSource
  extends DataSource
  implements SystemTimeDataSource {
  dataSource: SystemTimeDataSource;

  constructor(dataSourceMiddleware: SystemTimeDataSource) {
    super();
    this.dataSource = dataSourceMiddleware;
  }

  async getSystemTime(): Promise<SystemTime> {
    return await this.dataSource.getSystemTime();
  }
}
