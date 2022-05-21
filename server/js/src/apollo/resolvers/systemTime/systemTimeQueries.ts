import { SystemTimeDataSource } from '@data/dataSources';
import { logger } from '../../../logger';

export const systemTime = async (_parentId, _args, { dataSources }) => {
  try {
    logger.info('Resolving System Time');

    const systemTimeDataSource: SystemTimeDataSource =
      dataSources.systemTimeDataSource;

    const systemTime = await systemTimeDataSource.getSystemTime();

    logger.info(`Resolved system time: ${JSON.stringify(systemTime)}`);
    return systemTime;
  } catch (error) {
    logger.error(`Failed to resolve system time: ${JSON.stringify(error)}`);
  }
};
