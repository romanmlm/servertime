import { SystemTime } from '@data/domainTypes';
import { logDebugIfEnabled, logger } from '../../logger';
import { encoder, pubSubClient } from './client';

const NATS_SUBJECT_GET_TIME = 'get-time';

export async function getSystemTime(): Promise<SystemTime> {
  try {
    logger.debug('requesting system time');
    const client = await pubSubClient();
    const msg = await client.request(NATS_SUBJECT_GET_TIME, undefined, {
      timeout: 1000
    });
    const time = encoder.decode(msg.data);
    logDebugIfEnabled(() => `Decoded message data: ${time}`);
    const systemTime: SystemTime = { time: JSON.parse(time) };
    return systemTime;
  } catch (error) {
    logger.error(`getSystemTime failed: ${JSON.stringify(error)}`);
    throw error;
  }
}
