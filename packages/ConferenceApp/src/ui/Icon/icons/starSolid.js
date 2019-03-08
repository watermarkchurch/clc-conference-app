import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';

import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 24, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Path
      fill={fill}
      d="M8.64625613,8.247 L11.0615109,1.40457276 L11.065,1.395 C11.2116087,1.00515416 11.584498,0.747 12.001,0.747 C12.417502,0.747 12.7903913,1.00515416 12.9405303,1.40468962 L15.3538369,8.247 L22.1479615,8.247 C22.5666611,8.24696779 22.9410514,8.50778432 23.0861083,8.90055376 C23.2311652,9.29332319 23.1161732,9.73487749 22.7921214,10.0119176 L17.082439,14.7456104 L19.4744885,21.9313274 C19.6117246,22.3443155 19.4661084,22.7986422 19.1143695,23.0549091 C18.7626306,23.3111761 18.285539,23.3105364 17.93422,23.0531305 L11.9999278,18.6990936 L6.05857152,23.0561847 C5.70739215,23.3082718 5.23398783,23.3061623 4.88506894,23.0509557 C4.53615005,22.795749 4.39072128,22.3452309 4.52559522,21.9310756 L6.91755236,14.7456364 L1.20103847,10.007 C0.882826789,9.73487749 0.767834813,9.29332319 0.912891707,8.90055376 C1.0579486,8.50778432 1.43233889,8.24696779 1.851,8.247 L8.64625613,8.247 Z"
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
