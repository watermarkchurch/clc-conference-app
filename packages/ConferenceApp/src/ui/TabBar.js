import React from 'react';
import { TabBar } from 'react-native-tab-view';
import { compose, withProps } from 'recompose';

import { styled, withTheme, H6 } from '@apollosproject/ui-kit';
import Indicator from '@apollosproject/ui-kit/src/TabView/TabBar/Indicator';

const withStyles = compose(
  styled(
    ({ theme }) => ({
      backgroundColor: theme.colors.background.paper,
    }),
    'TabBar'
  ),
  withTheme(({ theme, indicatorColor }) => ({
    indicatorColor: indicatorColor || theme.colors.secondary,
    inactiveOpacity: 0.5,
  }))
);

const Label = styled(({ theme }) => ({
  color: theme.colors.text.primary,
}))(({ route, ...props }) => <H6 {...props}>{route.title}</H6>);

export default compose(
  withStyles,
  withProps({
    renderLabel: Label,
    renderIndicator: Indicator,
  })
)(TabBar);
