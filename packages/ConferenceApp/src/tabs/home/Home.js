import React, { PureComponent } from 'react';
import { SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Config from 'react-native-config';

import { BackgroundView, FeedView } from '@apollosproject/ui-kit';
import ContentCardConnected from 'ConferenceApp/src/ui/ContentCardConnected';

const getUserFeed = gql`
  query {
    conference(code: "${Config.CONFERENCE}") {
      announcements {
        edges {
          node {
            id
            title
            summary
            coverImage {
              name
              sources {
                uri
              }
            }
          }
        }
      }
    }
  }
`;

class Home extends PureComponent {
  static navigationOptions = () => ({
    header: null,
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
        <SafeAreaView>
          <Query query={getUserFeed} fetchPolicy="cache-and-network">
            {({ loading, error, data, refetch }) =>
              console.log({ loading, error, data, refetch }) || (
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
              )
            }
          </Query>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default Home;
