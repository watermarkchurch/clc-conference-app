import React, { PureComponent } from 'react';
import { StatusBar, ScrollView } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { get } from 'lodash';
import {
  BackgroundView,
  PaddedView,
  H5,
  HorizontalTileFeed,
  TouchableScale,
} from '@apollosproject/ui-kit';

import ContentCardConnected, {
  tileCardFragment,
} from '../../ui/ContentCardConnected';
import headerOptions from '../headerOptions';

const getMaps = gql`
  query {
    conference {
      maps {
        id
        ...tileCardFragment
      }
    }
  }
  ${tileCardFragment}
`;

const loadingStateObject = {
  id: 'fake_id',
  title: '',
  coverImage: [],
};

class Info extends PureComponent {
  static navigationOptions = {
    title: 'Info',
    ...headerOptions,
  };

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  renderMaps = ({ data: { conference } = {}, loading }) => (
    <HorizontalTileFeed
      content={get(conference, 'maps') || []}
      isLoading={loading}
      loadingStateObject={loadingStateObject}
      renderItem={({ item }) => (
        <TouchableScale
          onPress={() => {
            this.props.navigation.push('ContentSingle', {
              itemId: item.id,
            });
          }}
        >
          <ContentCardConnected
            contentId={item.id}
            isLoading={loading}
            tile
            inHorizontalList
          />
        </TouchableScale>
      )}
    />
  );

  render() {
    return (
      <BackgroundView>
        <ScrollView>
          <PaddedView vertical={false}>
            <H5>Maps</H5>
          </PaddedView>
          <Query query={getMaps} fetchPolicy="cache-and-network">
            {this.renderMaps}
          </Query>
        </ScrollView>
      </BackgroundView>
    );
  }
}

export default Info;
