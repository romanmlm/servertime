import dotenv from 'dotenv';
import { ServiceTypes } from './serviceTypes';
import path from 'path';

const isProduction = Boolean((<any>process).pkg);

const environment: string = isProduction
  ? 'production'
  : process.env.NODE_ENV || 'development';

dotenv.config({ path: `.env.${environment}` });

const {
  AUTH_TLS_CERT,
  NATS_TLS_CERT,
  NATS_TLS_KEY,
  NATS_TLS_CA,
  HOST,
  PORT,
  PUB_SUB_SERVICE,
  JWKS_ENDPOINT,
  SERVICE_TYPE,
  LOG_DIR,
  LOG_SEVERITY_LEVEL
} = process.env;

const authCertPath = path.join(process.cwd(), AUTH_TLS_CERT || '');
const natsCertPath = NATS_TLS_CERT
  ? path.join(process.cwd(), NATS_TLS_CERT)
  : '';
const natsKeyPath = NATS_TLS_KEY ? path.join(process.cwd(), NATS_TLS_KEY) : '';
const natsCaPath = NATS_TLS_CA ? path.join(process.cwd(), NATS_TLS_CA) : '';

export interface ServiceConfig {
  path: string;
  tlsCertPath?: string; // if no certificate path then apollo client will use grpc.credentials.createInsecure()
}

interface PubSubConfig extends ServiceConfig {
  tlsKeyPath?: string;
  tlsCaPath?: string;
}

export interface Config {
  apolloServer: {
    address: string;
    port: number;
  };

  services: {
    pubSubService: PubSubConfig;
  };

  auth: {
    tlsCertPath?: string; // if is not provided validate token using http instead of https
    jwksEndpoint: string;
  };

  serviceType: ServiceTypes;
  showPlayground: boolean;
  logger: {
    defaultLevel: string;
    dirname: string;
    transports: { level?: string; filename: string; dirname?: string }[];
    unhandledExceptions: { filename: string };
  };
}

export const config: Config = {
  apolloServer: {
    address: HOST || 'localhost',
    port: (PORT && parseInt(PORT)) || 4000
  },

  services: {
    pubSubService: {
      path: PUB_SUB_SERVICE || 'nats://localhost:4222',
      tlsCertPath: natsCertPath,
      tlsKeyPath: natsKeyPath,
      tlsCaPath: natsCaPath
    }
  },

  auth: {
    tlsCertPath: authCertPath,
    jwksEndpoint:
      JWKS_ENDPOINT || 'https://localhost:5353/hydra/.well-known/jwks.json'
  },

  serviceType:
    (SERVICE_TYPE && ServiceTypes[SERVICE_TYPE]) || ServiceTypes.grpc,
  showPlayground: !isProduction,
  logger: {
    defaultLevel: LOG_SEVERITY_LEVEL || 'info',
    dirname: LOG_DIR || 'logs',
    transports: [{ filename: 'server-time-api-%DATE%.log' }],
    unhandledExceptions: { filename: 'server-time-api-exceptions.log' }
  }
};
