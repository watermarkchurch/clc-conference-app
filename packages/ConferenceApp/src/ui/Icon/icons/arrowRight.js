import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Polygon } from 'react-native-svg';

import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 24, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Polygon fill={fill} points="0 1.5 1.5 0 8 6.5 1.5 13 0 11.5 5 6.5" />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
