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
  H4,
  BodyText,
  H6,
  styled,
} from '@apollosproject/ui-kit';
import Time from 'ConferenceApp/src/content-single/UniversalContentItem/Time';
import getContentCard from './query';

export { tileCardFragment, largeCardFragment } from './query';

const LabelText = styled(({ theme }) => ({
  color: theme.colors.primary,
  fontSize: 10,
}))(H6);

const FloatingFooterText = styled(({ theme }) => ({
  position: 'absolute',
  bottom: theme.sizing.baseUnit,
  left: theme.sizing.baseUnit,
  right: theme.sizing.baseUnit,
}))(H4);

const ContentCardConnected = ({
  contentId,
  isLoading,
  tile,
  ...otherProps
}) => {
  if (!contentId || isLoading)
    return (
      <ContentCard
        {...otherProps}
        contentId={contentId}
        isLoading={isLoading}
        tile={tile}
      />
    );

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
        if (node.startTime && !tile) {
          footer = <Time contentId={node.id} condensed />;
        } else if (tile) {
          footer = <FloatingFooterText>{node.title}</FloatingFooterText>;
        }

        const coverImage = get(node, 'coverImage.sources', undefined);

        if (tile && node.__typename === 'Location')
          return (
            <ContentCard
              {...otherProps}
              {...node}
              title={null}
              footer={footer}
              coverImage={coverImage}
              isLoading={isLoading}
              tile={tile}
              theme={{
                type: 'dark',
                colors: { primary: '#000000' },
              }}
            />
          );

        return (
          <Card isLoading={loading} tile={tile}>
            {coverImage || loading ? <CardImage source={coverImage} /> : null}
            <CardContent>
              {node.label ? <LabelText>{node.label}</LabelText> : null}
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
