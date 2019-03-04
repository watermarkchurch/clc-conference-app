import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import {
  BackgroundView,
  TabView,
  ActivityIndicator,
  H6,
} from '@apollosproject/ui-kit';
import TabBar from '../../ui/TabBar';

import Day from './Day';

const getDays = gql`
  query {
    conference {
      days {
        id
        title
      }
    }
  }
`;

class Schedule extends PureComponent {
  static navigationOptions = () => ({
    title: 'Schedule',
  });

  render() {
    return (
      <BackgroundView>
        <Query query={getDays} fetchPolicy="cache-and-network">
          {({ loading, data: { conference: { days = [] } = {} } = {} }) => {
            if (loading && !days.length) return <ActivityIndicator />;
            return (
              <TabView
                routes={days.map((day) => ({ key: day.id, title: day.title }))}
                renderScene={({ route }) => <Day id={route.key} />}
                renderTabBar={(props) => (
                  <TabBar
                    {...props}
                    renderLabel={({ route }) => <H6>{route.title}</H6>}
                  />
                )}
              />
            );
          }}
        </Query>
      </BackgroundView>
    );
  }
}

export default Schedule;
