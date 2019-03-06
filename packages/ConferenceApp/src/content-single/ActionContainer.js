import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@apollosproject/ui-kit';
import LikeButton from '../ui/LikeButton';

const StyledLikeButton = styled(({ theme }) => ({
  position: 'absolute',
  bottom: theme.sizing.baseUnit,
  right: theme.sizing.baseUnit,
}))(LikeButton);

const ActionContainer = ({ itemId }) => <StyledLikeButton itemId={itemId} />;

ActionContainer.propTypes = {
  itemId: PropTypes.string,
};

export default ActionContainer;
