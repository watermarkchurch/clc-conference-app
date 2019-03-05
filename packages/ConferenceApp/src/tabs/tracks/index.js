import { createStackNavigator } from 'react-navigation';
import { withTheme } from '@apollosproject/ui-kit';

import tabBarIcon from '../tabBarIcon';
import Tracks from './Tracks';

export const Navigator = createStackNavigator(
  {
    Tracks,
  },
  {
    initialRouteName: 'Tracks',
  }
);

Navigator.navigationOptions = {
  tabBarIcon: tabBarIcon('tracks'),
  tabBarLabel: 'Tracks',
};

export default withTheme(({ theme }) => ({ screenProps: { theme } }))(
  Navigator
);
