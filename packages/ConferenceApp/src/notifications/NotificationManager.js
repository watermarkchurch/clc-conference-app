import querystring from 'querystring';
import URL from 'url';
import gql from 'graphql-tag';
import { Component } from 'react';
import { Linking } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { get } from 'lodash';
import Config from 'react-native-config';
import NavigationService from '../NavigationService';
import { client } from '../client';

const UPDATE_DEVICE_PUSH_ID = gql`
  mutation updateDevicePushId($pushId: String!) {
    updateDevicePushId(pushId: $pushId) @client
  }
`;

export default class NotificationsInit extends Component {
  static navigationOptions = {};

  componentDidMount() {
    OneSignal.init(Config.ONE_SIGNAL_KEY, {
      kOSSettingsKeyAutoPrompt: false,
    });
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.configure();
    Linking.getInitialURL().then((url) => {
      this.navigate(url);
    });
    Linking.addEventListener('url', ({ url }) => this.navigate(url));
  }

  componentWillUnmount() {
    Linking.removeEventListener('url');
    OneSignal.removeEventListener('received');
    OneSignal.removeEventListener('opened');
    OneSignal.removeEventListener('ids');
  }

  navigate = (rawUrl) => {
    if (!rawUrl) return;
    const url = URL.parse(rawUrl);
    const route = url.pathname.substring(1);
    const args = querystring.parse(url.query);
    NavigationService.navigate(route, args);
  };

  onOpened = (openResult) => {
    // URL looks like this
    // ConferenceApp://AppStackNavigator/Connect
    // ConferenceApp://SomethingElse/Connect
    // ConferenceApp://SomethingElse/ContentSingle?itemId=SomeItemId:blablalba
    const url = get(openResult, 'notification.payload.additionalData.url');
    if (url) {
      this.navigate(url);
    }
  };

  onIds = (device) => {
    client.mutate({
      mutation: UPDATE_DEVICE_PUSH_ID,
      variables: { pushId: device.userId },
    });
  };

  render() {
    return null;
  }
}
