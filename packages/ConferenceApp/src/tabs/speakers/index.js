import { createStackNavigator } from 'react-navigation';

import tabBarIcon from '../tabBarIcon';

import Speakers from './Speakers';

export const HomeNavigator = createStackNavigator(
  {
    Speakers,
  },
  {
    initialRouteName: 'Speakers',
  }
);

HomeNavigator.navigationOptions = {
  tabBarIcon: tabBarIcon('profile'),
  tabBarLabel: 'Speakers',
};

export default HomeNavigator;
