import React, { PureComponent } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import {
  FeedView,
  Cell,
  CellText,
  Divider,
  H4,
  PaddedView,
  GradientOverlayImage,
  styled,
  Touchable,
} from '@apollosproject/ui-kit';

const query = gql`
  query getSpeakers($itemId: ID!) {
    node(id: $itemId) {
      ... on Event {
        id
        speakers {
          id
          title
          coverImage {
            sources {
              uri
            }
          }
          summary
        }
      }
    }
  }
`;

const Avatar = styled(({ theme }) => ({
  width: theme.sizing.baseUnit * 1.5,
  borderRadius: theme.sizing.baseUnit / 2,
  aspectRatio: 1,
}))(GradientOverlayImage);

class Speakers extends PureComponent {
  static propTypes = {
    contentId: PropTypes.string,
  };

  handleOnPress = (item) =>
    this.props.navigation.push('ContentSingle', {
      itemId: item.id,
    });

  render() {
    const { contentId } = this.props;
    return (
      <Query
        query={query}
        fetchPolicy="cache-and-network"
        variables={{ itemId: contentId }}
      >
        {({ loading, data, error, refetch }) =>
          data.node && data.node.speakers ? (
            <FeedView
              ListHeaderComponent={
                <PaddedView vertical={false}>
                  <H4 padded>Speakers</H4>
                </PaddedView>
              }
              renderItem={({ item }) => (
                <Touchable onPress={() => this.handleOnPress(item)}>
                  <React.Fragment>
                    <Cell>
                      <Avatar source={item.coverImage.sources} />
                      <CellText>{item.title}</CellText>
                    </Cell>
                    <Divider />
                  </React.Fragment>
                </Touchable>
              )}
              content={data.node.speakers || []}
              isLoading={loading}
              error={error}
              refetch={refetch}
              onPressItem={this.handleOnPress}
            />
          ) : null
        }
      </Query>
    );
  }
}

export default withNavigation(Speakers);
