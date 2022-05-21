import { ServiceTypes } from '../../serviceTypes';
import { NatsSystemTimeDataSource } from '@data/dataSources/nats';
import { SystemTimeDataSource } from '@data/dataSources';

export const combineDataSources = (
  serviceType: ServiceTypes
): {
  systemTimeDataSource: SystemTimeDataSource;
} => {
  switch (serviceType) {
    case ServiceTypes.nats:
    default:
      return {
        systemTimeDataSource: new NatsSystemTimeDataSource()
      };
  }
};
