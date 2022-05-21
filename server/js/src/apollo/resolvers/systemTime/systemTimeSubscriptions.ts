import pubsub from '@api/pubsub';
import { withFilter } from 'apollo-server';
import { logDebugIfEnabled, logger } from '../../../logger';

const TIME_EVENT = 'time-event';

export const systemTimeEvent = {
  subscribe: withFilter(
    () => {
      logger.info(`Subscribing to TIME_EVENT topic`);
      const iterator = pubsub.asyncIterator([TIME_EVENT]);
      const asyncReturn = iterator.return;
      iterator.return = () => {
        logger.debug('Unsubscribed');
        return asyncReturn
          ? asyncReturn.call(iterator)
          : Promise.resolve({ value: undefined, done: true });
      };
      return iterator;
    },
    (payload) => {
      logger.info(`Notifying about TIME_EVENT`);
      logDebugIfEnabled(() => `payload: ${JSON.stringify(payload)}`);
      return true;
    }
  ),
  resolve: (time: string, _args, _context) => {
    logger.debug(`System time event: ${time}`);
    return time;
  }
};
