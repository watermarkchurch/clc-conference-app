import React, { PureComponent } from 'react';
import { BackgroundView, ThemeMixin, FeedView } from '@apollosproject/ui-kit';
import { Query } from 'react-apollo';

import { withNavigation } from 'react-navigation';
import { get } from 'lodash';
import gql from 'graphql-tag';

import ContentCardConnected, {
  largeCardFragment,
} from 'ConferenceApp/src/ui/ContentCardConnected';

import { contentItemFragment } from '../../content-single/getContentItem';

import headerOptions from '../headerOptions';

const getTracks = gql`
  query getTracks {
    conference {
      tracks {
        ...largeCardFragment
        ...contentItemFragment
      }
    }
  }
  ${largeCardFragment}
  ${contentItemFragment}
`;

class Tracks extends PureComponent {
  static navigationOptions = ({ screenProps }) => ({
    title: 'Tracks',
    ...headerOptions,
    headerStyle: {
      ...headerOptions.headerStyle,
      backgroundColor: screenProps.theme.colors.secondary,
    },
    headerTitle: (props) => (
      <ThemeMixin mixin={{ type: 'dark' }}>
        <headerOptions.headerTitle {...props} />
      </ThemeMixin>
    ),
  });

  handleOnPress = (item) =>
    this.props.navigation.navigate('ContentSingle', {
      itemId: item.id,
      transitionKey: item.transitionKey,
    });

  render() {
    return (
      <BackgroundView>
        <Query query={getTracks} fetchPolicy="cache-and-network">
          {({ loading, data, error, refetch }) => (
            <FeedView
              content={get(data, 'conference.tracks', []) || []}
              isLoading={loading}
              error={error}
              refetch={refetch}
              refreshing={loading}
              ListItemComponent={ContentCardConnected}
              onPressItem={this.handleOnPress}
            />
          )}
        </Query>
      </BackgroundView>
    );
  }
}

export default withNavigation(Tracks);
