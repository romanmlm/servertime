import { ServiceTypes } from '../../serviceTypes';

export const combineSubscribers = (
  serviceType: ServiceTypes
): {
  someSubscriber: any;
} => {
  switch (serviceType) {
    case ServiceTypes.nats:
    default:
      return {
        someSubscriber: 'not implemented'
      };
    case ServiceTypes.grpc:
      return {
        someSubscriber: 'not implemented'
      };
  }
};
