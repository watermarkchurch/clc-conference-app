import React from 'react';
import PropTypes from 'prop-types';
import { styled, ConnectedImage } from '@apollosproject/ui-kit';
import { ScrollView, StyleSheet } from 'react-native';
import { get } from 'lodash';

const styles = StyleSheet.create({
  contentContainerStyle: { width: '100%', height: '100%' },
});

const SizedImage = styled({
  resizeMode: 'contain',
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
})(ConnectedImage);

const ImageZoomView = styled({
  width: '100%',
  height: '100%',
})(ScrollView);

const Location = ({ content }) => (
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
    <SizedImage source={get(content, 'map.sources') || []} />
  </ImageZoomView>
);

Location.propTypes = {
  content: PropTypes.shape({
    map: PropTypes.shape({
      sources: PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string })),
    }),
  }),
};

export default Location;
