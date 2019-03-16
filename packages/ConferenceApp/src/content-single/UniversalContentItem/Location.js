import React, { PureComponent } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { Cell, CellText, styled, Touchable } from '@apollosproject/ui-kit';
import { Caret } from '../../ui/ScheduleItem';
import Icon from '../../ui/Icon';

const OpaqueIcon = styled({ opacity: 0.8 })(Icon);
const query = gql`
  query getLocation($itemId: ID!) {
    node(id: $itemId) {
      id
      ... on Event {
        location {
          id
          title
        }
      }
    }
  }
`;

class Location extends PureComponent {
  static propTypes = {
    contentId: PropTypes.string,
  };

  handlePress = (item) => {
    this.props.navigation.push('ContentSingle', {
      itemId: item.id,
    });
  };

  render() {
    const { contentId } = this.props;
    return (
      <Query
        query={query}
        fetchPolicy="cache-and-network"
        variables={{ itemId: contentId }}
      >
        {({ loading, data }) => {
          if (!get(data, 'node.location') && get(data, 'location') !== null)
            return null;

          return (
            <Touchable onPress={() => this.handlePress(data.node.location)}>
              <Cell>
                <OpaqueIcon name="map" size={14} />
                <CellText isLoading={!get(data, 'node.location') && loading}>
                  {get(data, 'node.location.title')}
                </CellText>
                <Caret />
              </Cell>
            </Touchable>
          );
        }}
      </Query>
    );
  }
}

export default withNavigation(Location);
