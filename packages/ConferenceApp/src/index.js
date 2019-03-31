import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import { BackgroundView, withTheme } from '@apollosproject/ui-kit';

import MediaPlayer from './ui/MediaPlayer';
import Providers from './Providers';
import { NotificationsManager } from './notifications';
import NavigationService from './NavigationService';
import ContentSingle from './content-single';
import Tabs from './tabs';
import Onboarding, { Prompt as OnboardingPrompt } from './onboarding';
import { track } from './analytics';

const AppStatusBar = withTheme(({ theme }) => ({
  barStyle: 'dark-content',
  backgroundColor: theme.colors.paper,
}))(StatusBar);

const AppNavigator = createAppContainer(
  createStackNavigator(
    {
      Tabs,
      ContentSingle,
      Onboarding,
    },
    {
      initialRouteName: 'Tabs',
      mode: 'modal',
      headerMode: 'screen',
    }
  )
);

function getActiveRoute(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRoute(route);
  }
  return route;
}

const App = () => (
  <Providers>
    <BackgroundView>
      <AppStatusBar barStyle="dark-content" />
      <AppNavigator
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
        onNavigationStateChange={(prevState, currentState) => {
          const route = getActiveRoute(currentState);
          track({
            eventName: 'ScreenView',
            properties: {
              route: route.name,
              ...route.params,
            },
          });
        }}
      />
      <OnboardingPrompt />
      <NotificationsManager />
      <MediaPlayer />
    </BackgroundView>
  </Providers>
);

export default App;
