import React, { PureComponent } from 'react';
import { BackgroundView, ThemeMixin } from '@apollosproject/ui-kit';
import headerOptions from '../headerOptions';

class Tracks extends PureComponent {
  static navigationOptions = ({ screenProps }) => ({
    title: 'Tracks',
    ...headerOptions,
    headerStyle: {
      ...headerOptions.headerStyle,
      backgroundColor: screenProps.theme.colors.secondary,
    },
    headerTitle: (props) => (
      <ThemeMixin mixin={{ type: 'dark' }}>
        <headerOptions.headerTitle {...props} />
      </ThemeMixin>
    ),
  });

  render() {
    return <BackgroundView />;
  }
}

export default Tracks;
