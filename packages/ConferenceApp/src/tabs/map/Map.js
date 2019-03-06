import React, { PureComponent } from 'react';
import { styled } from '@apollosproject/ui-kit';
import { ScrollView, Image, StyleSheet } from 'react-native';
import headerOptions from '../headerOptions';

const styles = StyleSheet.create({
  contentContainerStyle: { width: '100%', height: '100%' },
});

const SizedImage = styled({
  resizeMode: 'cover',
  width: '100%',
  height: '100%',
})(Image);

const ImageZoomView = styled({
  width: '100%',
  height: '100%',
})(ScrollView);
class Map extends PureComponent {
  static navigationOptions = {
    title: 'Map',
    ...headerOptions,
  };

  render() {
    return (
      <ImageZoomView
        horizontal
        directionalLockEnabled={false}
        scrollEventThrottle={100}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        maximumZoomScale={1.0001}
        contentContainerStyle={styles.contentContainerStyle}
        bouncesZoom
      >
        <SizedImage source={require('./map.jpg')} />
      </ImageZoomView>
    );
  }
}

export default Map;
