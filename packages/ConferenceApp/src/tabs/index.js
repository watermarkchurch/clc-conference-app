import { createBottomTabNavigator } from 'react-navigation';

import TabBar from './tabBar';

import Home from './home';

const TabNavigator = createBottomTabNavigator(
  {
    Home,
  },
  {
    tabBarComponent: TabBar,
    lazy: true,
    removeClippedSubviews: true,
    tabBarOptions: {
      showLabel: true,
    },
  }
);

TabNavigator.navigationOptions = {
  header: null,
};

export default TabNavigator;
