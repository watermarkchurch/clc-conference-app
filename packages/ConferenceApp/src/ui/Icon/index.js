import PropTypes from 'prop-types';
import React from 'react';
import { compose, pure } from 'recompose';
import { camelCase } from 'lodash';

import * as Icons from './icons';

// Convenience component to render icons based on the icon's string name, like:
// <Icon name="skip-next" {...allOtherPropsPassedToComponent} />
//
// Can also import the icon directly:
// import { SkipNext } from 'Icon/icons';
// <SkipNext />

const enhance = compose(pure);

const Icon = enhance(({ name, size, ...otherProps }) => {
  const IconComponent = Icons[camelCase(name)];
  return <IconComponent size={size} {...otherProps} />;
});

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  fill: PropTypes.string,
};

Icon.defaultProps = {
  size: 24,
};

export default Icon;
