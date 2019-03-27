import React from 'react';
import { TabBar } from 'react-native-tab-view';
import { compose, withProps } from 'recompose';

import { styled, withTheme, H6 } from '@apollosproject/ui-kit';

const withStyles = compose(
  withTheme(({ theme, indicatorColor }) => ({
    indicatorColor: indicatorColor || theme.colors.secondary,
    inactiveOpacity: 0.5,
    style: {
      backgroundColor: theme.colors.background.paper,
    },
  }))
);

const Label = styled(({ theme }) => ({
  color: theme.colors.text.primary,
}))(({ route, ...props }) => <H6 {...props}>{route.title}</H6>);

export default compose(
  withStyles,
  withProps({
    renderLabel: Label,
  })
)(TabBar);
