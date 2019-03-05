import { createStackNavigator } from 'react-navigation';

import tabBarIcon from '../tabBarIcon';
import Map from './Map';

export const Navigator = createStackNavigator(
  {
    Map,
  },
  {
    initialRouteName: 'Map',
  }
);

Navigator.navigationOptions = {
  tabBarIcon: tabBarIcon('map'),
  tabBarLabel: 'Map',
};

export default Navigator;
