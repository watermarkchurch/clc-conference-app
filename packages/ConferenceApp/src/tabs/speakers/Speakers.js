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

const getSpeakers = gql`
  query {
    speakers {
      id
      name
    }
  }
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
              ListItemComponent={({ name }) => (
                <React.Fragment>
                  <Cell>
                    <CellContent>
                      <CellText>{name}</CellText>
                    </CellContent>
                  </Cell>
                  <Divider />
                </React.Fragment>
              )}
              content={data.speakers}
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
