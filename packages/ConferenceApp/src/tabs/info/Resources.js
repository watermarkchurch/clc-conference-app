import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { get } from 'lodash';
import { Linking } from 'react-native';
import {
  PaddedView,
  H5,
  UIText,
  TableView,
  Touchable,
  Cell,
  CellText,
  Divider,
} from '@apollosproject/ui-kit';
import { withNavigation } from 'react-navigation';

import { Caret } from '../../ui/ScheduleItem';
import { WebBrowserConsumer } from '../../ui/WebBrowser';

const getMaps = gql`
  query {
    conference {
      resources {
        __typename
        ... on Link {
          id
          title
          url
          useInAppBrowser
        }
        ... on Announcement {
          id
          title
        }
      }
    }
  }
`;

class Resources extends PureComponent {
  onPressHandler = ({ resource, openBrowser }) => () => {
    if (resource.__typename === 'Link') {
      if (resource.useInAppBrowser) {
        openBrowser(resource.url);
      } else {
        Linking.openURL(resource.url);
      }
    } else {
      this.props.navigation.push('ContentSingle', {
        itemId: resource.id,
      });
    }
  };

  renderTableView = ({ data: { conference } = {} }) => (
    <WebBrowserConsumer>
      {(openBrowser) => (
        <TableView>
          {(get(conference, 'resources') || []).map((resource) => (
            <React.Fragment key={resource.id}>
              <Touchable
                onPress={this.onPressHandler({ resource, openBrowser })}
              >
                <Cell>
                  <CellText>
                    <UIText>{resource.title}</UIText>
                  </CellText>
                  <Caret />
                </Cell>
              </Touchable>

              <Divider />
            </React.Fragment>
          ))}
        </TableView>
      )}
    </WebBrowserConsumer>
  );

  render() {
    return (
      <>
        <PaddedView />
        <PaddedView vertical={false}>
          <H5 padded>Resources</H5>
        </PaddedView>
        <Query query={getMaps} fetchPolicy="cache-and-network">
          {this.renderTableView}
        </Query>
      </>
    );
  }
}

export default withNavigation(Resources);
