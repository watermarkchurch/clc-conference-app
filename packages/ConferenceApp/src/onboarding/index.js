import React, { Component } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import { withApollo } from 'react-apollo';
import SafeAreaView from 'react-native-safe-area-view';
import { compose } from 'recompose';
import OneSignal from 'react-native-onesignal';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import {
  H2,
  BodyText,
  styled,
  withTheme,
  withThemeMixin,
  Button,
} from '@apollosproject/ui-kit';

import Swiper from 'react-native-swiper';

export Prompt from './Prompt';

const style = StyleSheet.create({
  slideImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

const getOnboarded = gql`
  query {
    didOnboard @client
  }
`;

const Slide = compose(
  withThemeMixin(({ themeMixin }) => themeMixin),
  styled(({ theme }) => ({
    flex: 1,
    justifyContent: 'center',
    paddingLeft: theme.sizing.baseUnit * 2,
    paddingRight: theme.sizing.baseUnit * 3,
  }))
)(View);

const ThemedSwiper = withTheme(() => ({
  dotColor: 'rgba(0,0,0,0.25)',
  activeDotColor: 'rgba(0,0,0,0.75)',
}))(Swiper);

const SlideTitle = styled(({ theme }) => ({
  paddingBottom: theme.sizing.baseUnit,
}))(H2);

const PaddedView = styled(({ theme }) => ({
  paddingHorizontal: theme.sizing.baseUnit * 2,
  paddingVertical: theme.sizing.baseUnit / 2,
}))(View);

const LogoWrapper = styled({
  position: 'absolute',
  top: 0,
  left: 0,
})(View);

const LogoImage = styled(({ theme }) => ({
  height: theme.sizing.baseUnit * 3,
  aspectRatio: 1,
  margin: theme.sizing.baseUnit * 2,
}))(Image);

const ActionRow = styled({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
})(SafeAreaView);

class Onboarding extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    client: PropTypes.shape({
      writeQuery: PropTypes.func,
    }),
  };

  scrollPos = new Animated.Value(0);

  viewWidth = new Animated.Value(1);

  componentDidMount() {
    this.props.client.writeQuery({
      query: getOnboarded,
      data: {
        didOnboard: true,
      },
    });
  }

  handlePromptNotifications = () => {
    OneSignal.registerForPushNotifications();
    this.handleClose();
  };

  handleClose = () => {
    this.props.navigation.goBack();
  };

  render() {
    const animatedIndex = Animated.divide(this.scrollPos, this.viewWidth);
    return (
      <View
        style={StyleSheet.absoluteFill}
        onLayout={Animated.event([
          {
            nativeEvent: { layout: { width: this.viewWidth } },
          },
        ])}
      >
        <StatusBar hidden />
        <View style={StyleSheet.absoluteFill}>
          <Animated.Image
            source={require('./slide-orange.jpg')}
            style={style.slideImage}
          />
        </View>
        <View style={StyleSheet.absoluteFill}>
          <Animated.Image
            source={require('./slide-purple.jpg')}
            style={[style.slideImage, { opacity: animatedIndex }]}
          />
        </View>
        <View style={StyleSheet.absoluteFill}>
          <Animated.Image
            source={require('./slide-gray.jpg')}
            style={[
              style.slideImage,
              { opacity: Animated.subtract(animatedIndex, 1) },
            ]}
          />
        </View>
        <LogoWrapper>
          <SafeAreaView forceInset={{ top: 'always' }}>
            <LogoImage source={require('./logo.png')} />
          </SafeAreaView>
        </LogoWrapper>
        <View style={StyleSheet.absoluteFill}>
          <ThemedSwiper
            loop={false}
            showsButtons={false}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { x: this.scrollPos } } },
            ])}
            scrollEventThrottle={16}
          >
            <Slide themeMixin={{ type: 'dark' }}>
              <SlideTitle>Meet the Church Leaders Conference App</SlideTitle>
              <BodyText>
                Your go-to resource for schedule, maps, news and of course -
                Farkle rules.
              </BodyText>
            </Slide>
            <Slide themeMixin={{ type: 'dark' }}>
              <SlideTitle>Customize Your Schedule</SlideTitle>
              <BodyText>
                Explore the schedule and tracks based on specific ministry
                areas. Star your favorites and they will be added to your{' '}
                {'"My CLC"'} tab.
              </BodyText>
            </Slide>
            {Platform.select({
              ios: (
                <Slide>
                  <SlideTitle>{"Don't Miss a Thing"}</SlideTitle>
                  <BodyText>
                    Allow push notifications to stay up to date on last minute
                    announcements, room changes and Farkle challenges.
                  </BodyText>
                  <ActionRow forceInset={{ bottom: 'always' }}>
                    <PaddedView>
                      <Button
                        title="Enable Notifications"
                        onPress={this.handlePromptNotifications}
                      />
                    </PaddedView>
                    <PaddedView vertical={false}>
                      <Button
                        title="No thanks"
                        type="default"
                        onPress={this.handleClose}
                      />
                    </PaddedView>
                    <PaddedView />
                  </ActionRow>
                </Slide>
              ),
              android: (
                <Slide>
                  <SlideTitle>{"Don't Miss a Thing"}</SlideTitle>
                  <BodyText>
                    {
                      "You'll receive push notifications to stay up to date on last minute announcements, room changes and Farkle challenges."
                    }
                  </BodyText>
                  <ActionRow forceInset={{ bottom: 'always' }}>
                    <PaddedView>
                      <Button title="Let's Go!" onPress={this.handleClose} />
                    </PaddedView>
                    <PaddedView />
                    <PaddedView />
                  </ActionRow>
                </Slide>
              ),
            })}
          </ThemedSwiper>
        </View>
      </View>
    );
  }
}

export default withApollo(Onboarding);
