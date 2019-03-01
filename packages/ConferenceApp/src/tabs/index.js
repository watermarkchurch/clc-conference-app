import { createBottomTabNavigator } from 'react-navigation';

import TabBar from './tabBar';

import Home from './home';
import Schedule from './schedule';

const TabNavigator = createBottomTabNavigator(
  {
    Home,
    Schedule,
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
