import { Component } from 'react';
import { AppState } from 'react-native';
import PropTypes from 'prop-types';

class AppStateRefetch extends Component {
  static propTypes = {
    refetch: PropTypes.func,
  };

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      this.props.refetch();
    }
  };

  render() {
    return null;
  }
}

export default AppStateRefetch;
