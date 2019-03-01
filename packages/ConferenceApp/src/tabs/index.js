import { createBottomTabNavigator } from 'react-navigation';

import TabBar from './tabBar';

import Home from './home';
import Schedule from './schedule';
import Speakers from './speakers';

const TabNavigator = createBottomTabNavigator(
  {
    Home,
    Schedule,
    Speakers,
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
