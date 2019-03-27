import React, { PureComponent } from 'react';
import { StatusBar, ScrollView } from 'react-native';
import { BackgroundView } from '@apollosproject/ui-kit';
import headerOptions from '../headerOptions';

import Maps from './Maps';
import Resources from './Resources';

class Info extends PureComponent {
  static navigationOptions = {
    title: 'Info',
    ...headerOptions,
  };

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('white'); // todo: don't hard-code color value
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  render() {
    return (
      <BackgroundView>
        <ScrollView>
          <Maps />
          <Resources />
        </ScrollView>
      </BackgroundView>
    );
  }
}

export default Info;
