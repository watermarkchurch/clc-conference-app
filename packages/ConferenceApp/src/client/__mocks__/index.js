import { MockedProvider } from 'react-apollo/test-utils';
import ApolloClient from 'apollo-client';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { SchemaLink } from 'apollo-link-schema';
import { testSchema as typeDefs } from 'apollos-api';

import cache from '../cache';

export default MockedProvider;

const schema = makeExecutableSchema({
  typeDefs,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});
addMockFunctionsToSchema({ schema });

const link = new SchemaLink({ schema });

export const client = new ApolloClient({
  cache,
  link,
});
