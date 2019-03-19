import { createBottomTabNavigator } from 'react-navigation';

import TabBar from './tabBar';

import Home from './home';
import Schedule from './schedule';
import Info from './info';
import Favorites from './favorites';
import Tracks from './tracks';

const TabNavigator = createBottomTabNavigator(
  {
    Home,
    Schedule,
    Favorites,
    Tracks,
    Info,
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
