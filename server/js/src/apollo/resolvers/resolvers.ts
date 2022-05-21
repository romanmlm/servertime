import { query } from './query';
import { mutation } from './mutation';
import { subscription } from './subscription';
import { response } from './response';

export const resolvers = {
  Query: query,
  Response: response,
  Mutation: mutation,
  Subscription: subscription
};
