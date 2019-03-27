import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Image, StyleSheet, StatusBar } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { BackgroundView, FeedView, styled } from '@apollosproject/ui-kit';
import ContentCardConnected, {
  largeCardFragment,
} from 'ConferenceApp/src/ui/ContentCardConnected';

import { contentItemFragment } from 'ConferenceApp/src/content-single/getContentItem';
import AppStateRefetch from '../../ui/AppStateRefetch';

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

const LogoTitle = styled(({ theme }) => ({
  height: theme.sizing.baseUnit * 2,
  margin: theme.sizing.baseUnit / 2,
  alignSelf: 'center',
  resizeMode: 'contain',
}))(Image);

const BackgroundTexture = styled({
  ...StyleSheet.absoluteFillObject,
  resizeMode: 'cover',
})(Image);

class Home extends PureComponent {
  static navigationOptions = () => ({
    title: 'Home',
    header: null,
    ...headerOptions,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      setParams: PropTypes.func,
      navigate: PropTypes.func,
    }),
  };

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#EEF2F3'); // todo: don't hard-code color value
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

  render() {
    return (
      <BackgroundView style={StyleSheet.absoluteFill}>
        <BackgroundTexture source={require('./texture.png')} />
        <SafeAreaView style={StyleSheet.absoluteFill}>
          <Query query={getUserFeed} fetchPolicy="cache-and-network">
            {({ loading, error, data, refetch }) => (
              <>
                <AppStateRefetch refetch={refetch} />

                <FeedView
                  ListItemComponent={ContentCardConnected}
                  ListHeaderComponent={
                    <LogoTitle source={require('./CLC-center.png')} />
                  }
                  content={get(data, 'conference.announcements.edges', []).map(
                    (edge) => edge.node
                  )}
                  isLoading={loading}
                  error={error}
                  refetch={refetch}
                  onPressItem={this.handleOnPress}
                />
              </>
            )}
          </Query>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default Home;
