import React, { PureComponent } from 'react';
import { BackgroundView } from '@apollosproject/ui-kit';
import headerOptions from '../headerOptions';

class Map extends PureComponent {
  static navigationOptions = {
    title: 'Map',
    ...headerOptions,
  };

  render() {
    return <BackgroundView />;
  }
}

export default Map;
