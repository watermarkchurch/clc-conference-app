import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { get } from 'lodash';

import { ContentCard, ErrorCard, styled, Card } from '@apollosproject/ui-kit';
import ScheduleItem from '../ScheduleItem';
import getContentCard from './query';

export { tileCardFragment, largeCardFragment } from './query';

const ScheduleItemWithSpacing = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit,
  height: null,
}))(ScheduleItem);

const ContentCardConnected = ({
  contentId,
  isLoading,
  tile,
  ...otherProps
}) => {
  if (!contentId || isLoading)
    return <ContentCard {...otherProps} isLoading tile={tile} />;

  return (
    <Query query={getContentCard} variables={{ contentId, tile: !!tile }}>
      {({ data: { node = {} } = {}, loading, error }) => {
        if (error) return <ErrorCard error={error} />;

        if (node.__typename === 'Event' || node.__typename === 'Breakouts') {
          return (
            <Card isLoading={isLoading || loading}>
              <ScheduleItemWithSpacing {...node} />
            </Card>
          );
        }

        const coverImage = get(node, 'coverImage.sources', undefined);

        return (
          <ContentCard
            {...node}
            {...otherProps}
            coverImage={coverImage}
            tile={tile}
            isLoading={loading}
          />
        );
      }}
    </Query>
  );
};

ContentCardConnected.propTypes = {
  isLoading: PropTypes.bool,
  contentId: PropTypes.string,
  tile: PropTypes.bool,
};

export default ContentCardConnected;
