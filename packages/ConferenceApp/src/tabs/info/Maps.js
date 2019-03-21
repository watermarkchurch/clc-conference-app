import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { get } from 'lodash';
import { withNavigation } from 'react-navigation';

import {
  PaddedView,
  H5,
  HorizontalTileFeed,
  TouchableScale,
} from '@apollosproject/ui-kit';

import ContentCardConnected, {
  tileCardFragment,
} from '../../ui/ContentCardConnected';

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

class Maps extends PureComponent {
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
      <>
        <PaddedView vertical={false}>
          <H5>Maps</H5>
        </PaddedView>
        <Query query={getMaps} fetchPolicy="cache-and-network">
          {this.renderMaps}
        </Query>
      </>
    );
  }
}

export default withNavigation(Maps);
