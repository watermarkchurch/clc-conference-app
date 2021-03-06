import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { StatusBar } from 'react-native';
import gql from 'graphql-tag';
import {
  BackgroundView,
  ThemeMixin,
  FeedView,
  PaddedView,
  H5,
  BodyText,
  Button,
  styled,
  FlexedView,
} from '@apollosproject/ui-kit';
import moment from 'moment';
import ContentCardConnected from '../../ui/ContentCardConnected';
import headerOptions from '../headerOptions';
import UpNext from './UpNext';

const ListHeader = styled({ paddingBottom: 0 })(PaddedView);

const getFavorites = gql`
  query {
    likedContent @client {
      id
      ... on Event {
        startTime
      }
      ... on Breakouts {
        startTime
      }
    }
  }
`;

class Favorites extends PureComponent {
  static navigationOptions = ({ screenProps }) => ({
    title: 'My CLC',
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

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#3E2B2E'); // todo: don't hard-code color value
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  handleOnPress = (item) =>
    this.props.navigation.navigate('ContentSingle', {
      itemId: item.id,
      transitionKey: item.transitionKey,
    });

  sortLikedContent = (content = []) =>
    content.sort((a, b) => moment(a.startTime) - moment(b.startTime));

  handleSchedulePress = () => this.props.navigation.navigate('Schedule');

  render() {
    return (
      <BackgroundView>
        <Query query={getFavorites} fetchPolicy="cache-and-network">
          {({ loading, error, data: { likedContent = [] }, refetch }) => (
            <FlexedView>
              <UpNext
                isLoading={loading}
                likedIds={likedContent.map(({ id }) => id)}
              />
              <FeedView
                ListHeaderComponent={
                  <ListHeader>
                    <H5>Your favorites</H5>
                  </ListHeader>
                }
                ListEmptyComponent={() => (
                  <PaddedView>
                    <PaddedView horizontal={false}>
                      <BodyText>
                        Find workshops, sessions and showcases to customize your
                        schedule.
                      </BodyText>
                    </PaddedView>
                    <Button
                      onPress={this.handleSchedulePress}
                      title="Explore the schedule"
                    />
                  </PaddedView>
                )}
                ListItemComponent={ContentCardConnected}
                content={this.sortLikedContent(likedContent || [])}
                isLoading={loading}
                error={error}
                refetch={refetch}
                onPressItem={this.handleOnPress}
              />
            </FlexedView>
          )}
        </Query>
      </BackgroundView>
    );
  }
}

export default Favorites;
