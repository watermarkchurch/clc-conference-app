import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
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
    paper: theme.colors.tertiary,
  },
}))(TabBar);

class Favorites extends PureComponent {
  static navigationOptions = ({ screenProps }) => ({
    title: 'My CLC.',
    ...headerOptions,
    headerStyle: {
      ...headerOptions.headerStyle,
      backgroundColor: screenProps.theme.colors.tertiary,
    },
    headerTitle: (props) => (
      <ThemeMixin mixin={{ type: 'dark' }}>
        <headerOptions.headerTitle {...props} />
      </ThemeMixin>
    ),
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
                renderScene={() => null}
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

export default Favorites;
