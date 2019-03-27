import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';

import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 24, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Path
      fill={fill}
      d="M21.6062479,10.8233911 L3.95644738,1.99739083 C3.54849511,1.7945685 3.06471284,1.81693818 2.67721481,2.05654146 C2.28971679,2.29614474 2.05351088,2.71896837 2.05263158,3.17458524 L2.05263158,20.8257408 C2.05333188,21.2814002 2.28956382,21.7043062 2.67717475,21.9438072 C3.06478569,22.1833082 3.54866745,22.2053536 3.95644738,22.0020901 L21.6062479,13.1769349 C22.051867,12.9540097 22.3333333,12.4984627 22.3333333,12.000163 C22.3333333,11.5018633 22.051867,11.0463163 21.6062479,10.8233911 Z"
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
