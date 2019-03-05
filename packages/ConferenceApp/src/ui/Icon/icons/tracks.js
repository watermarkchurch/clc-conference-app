import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path, G } from 'react-native-svg';

import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 24, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <G transform={{ y: 4 }}>
      <Path
        fill={fill}
        d="M0.623644683,13.5822494 C0.440148416,13.7886076 0.124108879,13.8071409 -0.0822493809,13.6236447 C-0.288607641,13.4401484 -0.307140949,13.1241089 -0.123644683,12.9177506 L7.21542992,4.66432484 C7.76688604,4.0555424 8.69876864,3.98591142 9.33809219,4.50888937 L13.7986869,8.22607704 C14.0212653,8.40825198 14.3477631,8.38313686 14.537012,8.17226762 L21.375012,0.419267621 C21.5576704,0.212167422 21.8736323,0.19235349 22.0807325,0.375011966 C22.2878327,0.557670441 22.3076466,0.873632276 22.1249881,1.08073247 L15.2841366,8.83693777 C14.7349773,9.44891485 13.8016052,9.52071244 13.1619078,8.99711065 L8.70142893,5.28001779 C8.4779515,5.09721873 8.15040208,5.12169347 7.95964468,5.33224938 L0.623644683,13.5822494 Z"
      />
      <Path
        fill={fill}
        d="M21.25,1.25 L14.812,1.25 C14.5358576,1.25 14.312,1.02614237 14.312,0.75 C14.312,0.473857625 14.5358576,0.25 14.812,0.25 L21.75,0.25 C22.0261424,0.25 22.25,0.473857625 22.25,0.75 L22.25,6.729 C22.25,7.00514237 22.0261424,7.229 21.75,7.229 C21.4738576,7.229 21.25,7.00514237 21.25,6.729 L21.25,1.25 Z"
      />
    </G>
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
