import { logger } from '../../logger';
import { connect, StringCodec } from 'nats';
import { config } from '../../config';

export async function pubSubClient() {
  try {
    const {
      path,
      tlsCaPath,
      tlsCertPath,
      tlsKeyPath
    } = config.services.pubSubService;
    const client = await connect({
      servers: path,
      tls: tlsCertPath
        ? {
            certFile: tlsCertPath,
            keyFile: tlsKeyPath || undefined,
            caFile: tlsCaPath || undefined
          }
        : undefined
    });
    return client;
  } catch (error) {
    logger.error(`pubsub client error: ${JSON.stringify(error)}`);
    throw error;
  }
}

export const encoder = StringCodec();
