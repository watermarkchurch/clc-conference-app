import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { StatusBar } from 'react-native';
import {
  BackgroundView,
  TabView,
  ActivityIndicator,
  H6,
  ThemeMixin,
  withThemeMixin,
} from '@apollosproject/ui-kit';
import TabBar from '../../ui/TabBar';
import headerOptions from '../headerOptions';

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

const ThemedTabBar = withThemeMixin(({ theme }) => ({
  type: 'dark',
  colors: {
    paper: theme.colors.primary,
  },
}))(TabBar);

class Schedule extends PureComponent {
  static navigationOptions = ({ screenProps }) => ({
    title: 'Schedule',
    ...headerOptions,
    headerStyle: {
      ...headerOptions.headerStyle,
      backgroundColor: screenProps.theme.colors.primary,
    },
    headerTitle: (props) => (
      <ThemeMixin mixin={{ type: 'dark' }}>
        <headerOptions.headerTitle {...props} />
      </ThemeMixin>
    ),
  });

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

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
                  <ThemedTabBar
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
