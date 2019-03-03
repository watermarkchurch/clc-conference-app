import React from 'react';
import PropTypes from 'prop-types';

import { Icon, withTheme, Touchable } from '@apollosproject/ui-kit';

const LikeIcon = withTheme(
  ({ theme: { colors: { secondary } = {} } = {}, isLiked } = {}) => ({
    name: isLiked ? 'like-solid' : 'like',
    fill: secondary,
  })
)(Icon);

LikeIcon.propTypes = {
  isLiked: PropTypes.bool,
};

const Like = ({ isLiked, toggleLike, itemId }) => (
  <Touchable
    onPress={() =>
      toggleLike({ itemId, operation: isLiked ? 'Unlike' : 'Like' })
    }
  >
    <LikeIcon isLiked={isLiked} />
  </Touchable>
);

Like.propTypes = {
  itemId: PropTypes.string,
  isLiked: PropTypes.bool,
  toggleLike: PropTypes.func,
};

export { Like as default, LikeIcon };
