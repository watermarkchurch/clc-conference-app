import React, { PureComponent } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import { get } from 'lodash';

import { Cell, CellText, styled } from '@apollosproject/ui-kit';

const LightText = styled({ opacity: 0.5 })(Text);

const query = gql`
  query getTime($itemId: ID!) {
    node(id: $itemId) {
      ... on Event {
        startTime
        endTime
      }
      ... on Breakouts {
        startTime
        endTime
      }
    }
  }
`;

class Time extends PureComponent {
  static propTypes = {
    contentId: PropTypes.string,
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
          if (!get(data, 'node.startTime') && get(data, 'node') !== null)
            return null;

          return (
            <>
              <Cell>
                <CellText isLoading={!get(data, 'node.startTime') && loading}>
                  {moment(get(data, 'node.startTime')).format('dddd hh:mma')}
                  {' - '}
                  {moment(get(data, 'node.endTime')).format('hh:mma')}{' '}
                  <LightText>
                    {moment(get(data, 'node.startTime')).fromNow()}
                  </LightText>
                </CellText>
              </Cell>
            </>
          );
        }}
      </Query>
    );
  }
}

export default withNavigation(Time);
