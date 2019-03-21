import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import NavigationService from '../NavigationService';

const getOnboardedStatus = gql`
  query {
    didOnboard @client
  }
`;

const getCacheLoad = gql`
  query {
    cacheLoaded @client
  }
`;
const Prompt = () => (
  <Query query={getCacheLoad}>
    {({ data: { cacheLoaded } = {}, loading }) => (
      <Query query={getOnboardedStatus}>
        {({ data: { didOnboard } = {}, loading: innerLoading }) => {
          if (cacheLoaded && !didOnboard && !loading && !innerLoading) {
            setTimeout(() => NavigationService.navigate('Onboarding'), 1);
          }
          return null;
        }}
      </Query>
    )}
  </Query>
);

export default Prompt;
