import { createStackNavigator } from 'react-navigation';

import { withTheme } from '@apollosproject/ui-kit';
import tabBarIcon from '../tabBarIcon';

import Favorites from './Favorites';

export const Navigator = createStackNavigator(
  {
    Favorites,
  },
  {
    initialRouteName: 'Favorites',
  }
);

Navigator.navigationOptions = {
  tabBarIcon: tabBarIcon('star'),
  tabBarLabel: 'My CLC',
};

export default withTheme(({ theme }) => ({ screenProps: { theme } }))(
  Navigator
);
