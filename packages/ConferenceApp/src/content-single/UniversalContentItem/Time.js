import React, { PureComponent } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import { get } from 'lodash';

import { Cell, CellText, Divider, styled } from '@apollosproject/ui-kit';
import Icon from '../../ui/Icon';

const OpaqueIcon = styled({ opacity: 0.8 })(Icon);

const LightText = styled({ opacity: 0.5 })(Text);

const query = gql`
  query getTime($itemId: ID!) {
    node(id: $itemId) {
      id
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
    condensed: PropTypes.bool,
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
                {!get(data, 'node.startTime') && loading ? (
                  <View />
                ) : (
                  <OpaqueIcon name="time" size={14} />
                )}
                <CellText isLoading={!get(data, 'node.startTime') && loading}>
                  {moment(get(data, 'node.startTime')).format(
                    this.props.condensed ? 'ddd h:mma' : 'dddd h:mma'
                  )}
                  {' - '}
                  {moment(get(data, 'node.endTime')).format('h:mma')}{' '}
                  {!this.props.condensed ? (
                    <LightText>
                      {moment(get(data, 'node.startTime')).fromNow()}
                    </LightText>
                  ) : null}
                </CellText>
              </Cell>
              <Divider />
            </>
          );
        }}
      </Query>
    );
  }
}

export default withNavigation(Time);
