import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { get } from 'lodash';

import {
  ContentCard,
  ErrorCard,
  Card,
  CardContent,
  CardImage,
  H3,
  BodyText,
} from '@apollosproject/ui-kit';
import Time from 'ConferenceApp/src/content-single/UniversalContentItem/Time';
import getContentCard from './query';

export { tileCardFragment, largeCardFragment } from './query';

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

        // if (node.__typename === 'Event' || node.__typename === 'Breakouts') {
        //   // return (
        //   //   <Card isLoading={isLoading || loading}>
        //   //     <ScheduleItemWithSpacing {...node} />
        //   //   </Card>
        //   // );
        // }

        let footer = null;
        if (node.startTime) {
          footer = <Time contentId={node.id} />;
        }

        const coverImage = get(node, 'coverImage.sources', undefined);

        return (
          <Card isLoading={loading}>
            {coverImage || loading ? <CardImage source={coverImage} /> : null}
            <CardContent>
              {node.title || loading ? <H3>{node.title}</H3> : null}
              {node.summary || loading ? (
                <BodyText>{node.summary}</BodyText>
              ) : null}
            </CardContent>
            {footer}
          </Card>
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
