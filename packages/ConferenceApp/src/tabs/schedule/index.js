import { createStackNavigator } from 'react-navigation';
import { withTheme } from '@apollosproject/ui-kit';

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
  tabBarIcon: tabBarIcon('schedule'),
  tabBarLabel: 'Schedule',
};

export default withTheme(({ theme }) => ({ screenProps: { theme } }))(
  HomeNavigator
);
