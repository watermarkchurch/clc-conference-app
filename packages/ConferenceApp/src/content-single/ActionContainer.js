import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { styled } from '@apollosproject/ui-kit';
import LikeButton from '../ui/LikeButton';
import { MediaPlayerSpacer } from '../ui/MediaPlayer';

const Wrapper = styled(({ theme }) => ({
  position: 'absolute',
  bottom: theme.sizing.baseUnit,
  right: theme.sizing.baseUnit,
}))(View);

const ActionContainer = ({ itemId }) => (
  <Wrapper>
    <LikeButton itemId={itemId} />
    <MediaPlayerSpacer />
  </Wrapper>
);

ActionContainer.propTypes = {
  itemId: PropTypes.string,
};

export default ActionContainer;
