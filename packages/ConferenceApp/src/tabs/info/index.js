import { createStackNavigator } from 'react-navigation';

import tabBarIcon from '../tabBarIcon';
import Info from './Info';

export const Navigator = createStackNavigator(
  {
    Info,
  },
  {
    initialRouteName: 'Info',
  }
);

Navigator.navigationOptions = {
  tabBarIcon: tabBarIcon('info'),
  tabBarLabel: 'Info',
};

export default Navigator;
