import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';

import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 24, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Path
      fill={fill}
      d="M16.4926667,0.373750187 L22.4926667,2.77375018 C23.2521571,3.07749195 23.7501366,3.81310746 23.75,4.631 L23.7499935,18.9974471 C23.7521178,19.4134996 23.5470954,19.8033392 23.2030896,20.0373567 C22.8590838,20.2713743 22.4211899,20.3188927 22.0355484,20.1643357 L16.1213333,17.8022498 C15.8829561,17.706916 15.6170439,17.706916 15.3787329,17.8022233 L8.99266667,20.3572498 C8.51591212,20.5479175 7.98408788,20.5479175 7.50730466,20.3572383 L1.50733334,17.9572498 C0.747842864,17.653508 0.249863376,16.9178925 0.25,16.1 L0.250006517,1.72955291 C0.247882197,1.31350042 0.452904617,0.92366083 0.796910401,0.689643289 C1.14091619,0.455625749 1.57881012,0.40810728 1.96472241,0.562772482 L7.87866667,2.92875019 C8.11704394,3.02408402 8.38295606,3.02408402 8.62126706,2.9287767 L15.0073333,0.373750187 C15.4840879,0.183082523 16.0159121,0.183082523 16.4926667,0.373750187 Z M15.3787329,1.3022233 L8.99266667,3.85724981 C8.51591212,4.04791748 7.98408788,4.04791748 7.50727759,3.85722752 L1.59299348,1.49111375 C1.5157542,1.46015796 1.42817542,1.46966165 1.35937426,1.51646516 C1.2905731,1.56326867 1.24956862,1.64123659 1.25,1.727 L1.24999999,16.1000835 C1.24993168,16.5090715 1.49892142,16.8768793 1.87869534,17.0287617 L7.87866667,19.4287502 C8.11704394,19.524084 8.38295606,19.524084 8.62126706,19.4287767 L15.0073333,16.8737502 C15.4840879,16.6830825 16.0159121,16.6830825 16.4924516,16.8736643 L22.4070065,19.2358862 C22.4842458,19.266842 22.5718246,19.2573383 22.6406257,19.2105348 C22.7094269,19.1637313 22.7504314,19.0857634 22.75,19 L22.75,4.63091648 C22.7500683,4.22192845 22.5010786,3.8541207 22.1213047,3.70223835 L16.121319,1.30224408 C15.8829561,1.20691598 15.6170439,1.20691598 15.3787329,1.3022233 Z"
    />
    <Path
      fill={fill}
      d="M7.75,3.5 C7.75,3.22385763 7.97385763,3 8.25,3 C8.52614237,3 8.75,3.22385763 8.75,3.5 L8.75,20 C8.75,20.2761424 8.52614237,20.5 8.25,20.5 C7.97385763,20.5 7.75,20.2761424 7.75,20 L7.75,3.5 Z"
    />
    <Path
      fill={fill}
      d="M15.25,0.731 C15.25,0.454857625 15.4738576,0.231 15.75,0.231 C16.0261424,0.231 16.25,0.454857625 16.25,0.731 L16.25,17.231 C16.25,17.5071424 16.0261424,17.731 15.75,17.731 C15.4738576,17.731 15.25,17.5071424 15.25,17.231 L15.25,0.731 Z"
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;