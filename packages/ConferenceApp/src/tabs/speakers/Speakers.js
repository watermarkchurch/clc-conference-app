import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import {
  BackgroundView,
  FeedView,
  Cell,
  CellContent,
  CellText,
  Divider,
} from '@apollosproject/ui-kit';

import { contentItemFragment } from '../../content-single/getContentItem';

const getSpeakers = gql`
  query {
    speakers {
      ...contentItemFragment
    }
  }
  ${contentItemFragment}
`;

class Speakers extends PureComponent {
  static navigationOptions = () => ({
    title: 'Speakers',
  });

  handleOnPress = (item) =>
    this.props.navigation.navigate('ContentSingle', {
      itemId: item.id,
      transitionKey: item.transitionKey,
    });

  render() {
    return (
      <BackgroundView>
        <Query query={getSpeakers} fetchPolicy="cache-and-network">
          {({ loading, data, error, refetch }) => (
            <FeedView
              ListItemComponent={({ title }) => (
                <React.Fragment>
                  <Cell>
                    <CellContent>
                      <CellText>{title}</CellText>
                    </CellContent>
                  </Cell>
                  <Divider />
                </React.Fragment>
              )}
              content={data.speakers || []}
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

export default Speakers;
