import { PureComponent } from 'react';
import { StatusBar } from 'react-native';
import headerOptions from '../headerOptions';

class Info extends PureComponent {
  static navigationOptions = {
    title: 'Info',
    ...headerOptions,
  };

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  render() {
    return null;
  }
}

export default Info;
