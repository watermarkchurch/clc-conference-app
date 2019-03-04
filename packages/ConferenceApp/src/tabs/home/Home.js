import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { BackgroundView, FeedView } from '@apollosproject/ui-kit';
import ContentCardConnected, {
  largeCardFragment,
} from 'ConferenceApp/src/ui/ContentCardConnected';

import { contentItemFragment } from 'ConferenceApp/src/content-single/getContentItem';

import headerOptions from '../headerOptions';

export const getUserFeed = gql`
  query {
    conference {
      announcements {
        edges {
          node {
            ...largeCardFragment
            ...contentItemFragment
          }
        }
      }
    }
  }
  ${largeCardFragment}
  ${contentItemFragment}
`;

class Home extends PureComponent {
  static navigationOptions = () => ({
    title: 'Home',
    ...headerOptions,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      setParams: PropTypes.func,
      navigate: PropTypes.func,
    }),
  };

  handleOnPress = (item) =>
    this.props.navigation.navigate('ContentSingle', {
      itemId: item.id,
      transitionKey: item.transitionKey,
    });

  render() {
    return (
      <BackgroundView>
        <Query query={getUserFeed} fetchPolicy="cache-and-network">
          {({ loading, error, data, refetch }) => (
            <FeedView
              ListItemComponent={ContentCardConnected}
              content={get(data, 'conference.announcements.edges', []).map(
                (edge) => edge.node
              )}
              isLoading={loading}
              error={error}
              refetch={refetch}
              onPressItem={this.handleOnPress}
            />
          )}
        </Query>
      </BackgroundView>
    );
  }
}

export default Home;
