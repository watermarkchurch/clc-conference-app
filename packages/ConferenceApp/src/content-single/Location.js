import React from 'react';
import PropTypes from 'prop-types';
import { styled, H4, ConnectedImage } from '@apollosproject/ui-kit';
import { ScrollView, StyleSheet } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { get } from 'lodash';

const styles = StyleSheet.create({
  contentContainerStyle: { width: '100%', height: '100%' },
});

const Title = styled({
  textAlign: 'center',
})(H4);

const SizedImage = styled({
  resizeMode: 'contain',
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
})(ConnectedImage);

const ImageZoomView = styled({
  width: '100%',
  flex: 1,
})(ScrollView);

const Location = ({ content }) => (
  <>
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Title>{content.title}</Title>
    </SafeAreaView>
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
  </>
);

Location.propTypes = {
  content: PropTypes.shape({
    map: PropTypes.shape({
      sources: PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string })),
    }),
  }),
};

export default Location;
