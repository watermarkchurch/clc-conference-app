import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
// import SplashScreen from 'react-native-splash-screen';
import gql from 'graphql-tag';

import { resolvers, schema } from '../store';
import httpLink from './httpLink';
import cache, { ensureCacheHydration } from './cache';

const link = httpLink;

export const client = new ApolloClient({
  link,
  cache,
  queryDeduplication: true,
  shouldBatch: true,
  resolvers,
  typeDefs: schema,
});

export const CACHE_LOADED = gql`
  query {
    cacheLoaded @client
  }
`;

class ClientProvider extends PureComponent {
  static propTypes = {
    client: PropTypes.shape({
      cache: PropTypes.shape({}),
      mutate: PropTypes.func,
      writeQuery: PropTypes.func,
    }),
  };

  static defaultProps = {
    client,
  };

  async componentDidMount() {
    try {
      await ensureCacheHydration;
    } catch (e) {
      throw e;
    } finally {
      this.props.client.writeQuery({
        query: CACHE_LOADED,
        data: { cacheLoaded: true },
      });
      // if (SplashScreen && SplashScreen.hide) SplashScreen.hide();
    }
  }

  render() {
    return <ApolloProvider {...this.props} />;
  }
}

export default ClientProvider;
