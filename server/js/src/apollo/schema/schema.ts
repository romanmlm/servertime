import { Response, Status } from './status';
import { Query } from './query';
import { Mutation } from './mutation';
import { Subscription } from './subscription';
import { SystemTime, SystemTimeEvent, SystemTimeQuery } from './systemTime';

export const typeDefs = [
  Query,
  Mutation,
  Subscription,
  Response,
  Status,
  SystemTime,
  SystemTimeQuery,
  SystemTimeEvent
];
