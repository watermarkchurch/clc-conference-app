import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import HTMLView from 'ConferenceApp/src/ui/HTMLView';
import { ErrorCard } from '@apollosproject/ui-kit';

import getContentItemContent from './getContentItemContent';

const HTMLContent = ({ contentId }) => {
  if (!contentId) return <HTMLView isLoading />;

  return (
    <Query
      query={getContentItemContent}
      variables={{ contentId }}
      fetchPolicy="cache-and-network"
    >
      {({ data: { node: { htmlContent } = {} } = {}, loading, error }) => {
        if (error) return <ErrorCard error={error} />;
        if (!loading && !htmlContent) return null;
        return (
          <HTMLView isLoading={!htmlContent && loading}>{htmlContent}</HTMLView>
        );
      }}
    </Query>
  );
};

HTMLContent.propTypes = {
  contentId: PropTypes.string,
};

export default HTMLContent;
