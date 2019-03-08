import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { AsyncStorage } from 'react-native';
import { CachePersistor } from 'apollo-cache-persist';

import { defaults } from '../store';
import introspectionQueryResultData from './fragmentTypes.json';

// TODO: Disabling cache versioning. Better not make breaking changes :)
// We reset our apollo cache on every build:
// TODO: this could be optimized by only reseting cache when our schema or client-side schema changes,
// however there is risk for missing changes and breaking things in production, so this is safer.
// const SCHEMA_VERSION = `${DeviceInfo.getVersion()}${DeviceInfo.getBuildNumber()}`; // Must be a string.
// const SCHEMA_VERSION_KEY = 'apollo-schema-version';

const nodeCacheRedirect = (_, { id }, { getCacheKey }) =>
  id ? getCacheKey({ __typename: id.split(':')[0], id }) : null;

const cache = new InMemoryCache({
  fragmentMatcher: new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
  }),
  cacheRedirects: {
    Query: {
      node: nodeCacheRedirect,
    },
  },
});

const persistor = new CachePersistor({
  cache,
  storage: AsyncStorage,
});

cache.writeData({
  data: { defaults },
});

export const ensureCacheHydration = (async () => {
  try {
    await persistor.restore();
  } catch (error) {
    await persistor.purge();
  }
})();

export default cache;
