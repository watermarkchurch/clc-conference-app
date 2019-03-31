/* eslint-disable */
import gql from 'graphql-tag';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
import Analytics from 'appcenter-analytics';

import { client } from '../client';

const anonymousId = DeviceInfo.getUniqueID();

const deviceInfo = {
  platform: Platform.OS === 'ios' ? 'iOS' : 'Android',
  deviceId: anonymousId,
  deviceModel: DeviceInfo.getModel(),
  osVersion: DeviceInfo.getSystemVersion(),
  appVersion: DeviceInfo.getVersion(),
};

const trackMutation = gql`
  mutation track($input: AnalyticsTrackInput!) {
    trackEvent(input: $input) {
      success
    }
  }
`;

const identifyMutation = gql`
  mutation identify($input: AnalyticsIdentifyInput!) {
    identifySelf(input: $input) {
      success
    }
  }
`;

const propertiesToGqlInput = (props = []) =>
  Object.keys(props).map(key => ({
    field: key,
    value: props[key],
  }));

export const track = ({ eventName, properties }) => {
  Analytics.trackEvent(eventName, properties);
};

export const identify = () => {};

export const events = {
  LikeContent: 'Like Content',
  UnlikeContent: 'Unlike Content',
  ViewContent: 'View Content',
  ShareContent: 'Share Content',
  UserLogin: 'User Login',
  UserSignup: 'User Signup',
  UserLogout: 'UserLogout',
  UserForgotPassword: 'User Forgot Password',
  UserPlayedMedia: 'User Played Media',
};

export default {
  track,
  identify,
  events,
};
