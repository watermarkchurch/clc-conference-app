import { createStackNavigator } from 'react-navigation';

import tabBarIcon from '../tabBarIcon';

import Schedule from './Schedule';

export const HomeNavigator = createStackNavigator(
  {
    Schedule,
  },
  {
    initialRouteName: 'Schedule',
  }
);

HomeNavigator.navigationOptions = {
  tabBarIcon: tabBarIcon('calendar'),
  tabBarLabel: 'Schedule',
};

export default HomeNavigator;
