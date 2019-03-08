import React from 'react';
import PropTypes from 'prop-types';

import { Platform } from 'react-native';

import { withTheme, styled, TouchableScale } from '@apollosproject/ui-kit';
import Icon from '../Icon';

const LikeTouchable = styled(({ theme }) => ({
  width: theme.sizing.baseUnit * 4,
  height: theme.sizing.baseUnit * 4,
  borderRadius: theme.sizing.baseUnit * 4,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.colors.paper,
  ...Platform.select(theme.shadows.default),
}))(TouchableScale);

const LikeIcon = withTheme(
  ({ theme: { colors: { secondary } = {} } = {}, isLiked } = {}) => ({
    name: isLiked ? 'star-solid' : 'star',
    fill: secondary,
    size: 32,
  })
)(Icon);

LikeIcon.propTypes = {
  isLiked: PropTypes.bool,
};

const Like = ({ isLiked, toggleLike, itemId, ...otherProps }) => (
  <LikeTouchable
    {...otherProps}
    onPress={() =>
      toggleLike({ itemId, operation: isLiked ? 'Unlike' : 'Like' })
    }
  >
    <LikeIcon isLiked={isLiked} />
  </LikeTouchable>
);

Like.propTypes = {
  itemId: PropTypes.string,
  isLiked: PropTypes.bool,
  toggleLike: PropTypes.func,
};

export { Like as default, LikeIcon };
