import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { BackgroundView, ThemeMixin, FeedView } from '@apollosproject/ui-kit';
import ContentCardConnected from '../../ui/ContentCardConnected';
import headerOptions from '../headerOptions';

const getFavorites = gql`
  query {
    likedContent @client {
      id
    }
  }
`;

class Favorites extends PureComponent {
  static navigationOptions = ({ screenProps }) => ({
    title: 'My CLC.',
    ...headerOptions,
    headerStyle: {
      ...headerOptions.headerStyle,
      backgroundColor: screenProps.theme.colors.tertiary,
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
        <Query query={getFavorites} fetchPolicy="cache-and-network">
          {({ loading, error, data: { likedContent = [] } = {}, refetch }) => (
            <FeedView
              ListItemComponent={ContentCardConnected}
              content={likedContent}
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

export default Favorites;
