import React, { PureComponent } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { View } from 'react-native';

import {
  TableView,
  Cell,
  CellText,
  Divider,
  H4,
  PaddedView,
  GradientOverlayImage,
  styled,
  Touchable,
} from '@apollosproject/ui-kit';
import { Caret } from '../../ui/ScheduleItem';

const query = gql`
  query getSpeakers($itemId: ID!) {
    node(id: $itemId) {
      ... on Event {
        id
        speakers {
          id
          title
          coverImage {
            sources {
              uri
            }
          }
          summary
        }
      }
    }
  }
`;

const Avatar = styled(({ theme }) => ({
  width: theme.sizing.baseUnit * 1.5,
  borderRadius: theme.sizing.baseUnit / 2,
  aspectRatio: 1,
}))(GradientOverlayImage);

class Speakers extends PureComponent {
  static propTypes = {
    contentId: PropTypes.string,
  };

  handleOnPress = (item) =>
    this.props.navigation.push('ContentSingle', {
      itemId: item.id,
    });

  render() {
    const { contentId } = this.props;
    return (
      <Query
        query={query}
        fetchPolicy="cache-and-network"
        variables={{ itemId: contentId }}
      >
        {({ loading, data: { node } = {} }) => {
          const speakers = get(node, 'speakers') || [];

          if (node !== null && !speakers.length) return null;

          return (
            <>
              <PaddedView vertical={false}>
                <H4 isLoading={loading && !speakers.length} padded>
                  Speakers
                </H4>
              </PaddedView>
              <TableView>
                {(
                  speakers ||
                  (loading && !speakers.length ? [{ id: 'loading' }] : [])
                ).map((item) => (
                  <Touchable
                    onPress={() => this.handleOnPress(item)}
                    key={item.id}
                  >
                    <View>
                      <Cell>
                        <Avatar
                          isLoading={loading && !speakers.length}
                          source={get(item, 'coverImage.sources', [])}
                        />
                        <CellText isLoading={loading && !speakers.length}>
                          {item.title}
                        </CellText>
                        <Caret />
                      </Cell>
                      <Divider />
                    </View>
                  </Touchable>
                ))}
              </TableView>
            </>
          );
        }}
      </Query>
    );
  }
}

export default withNavigation(Speakers);
