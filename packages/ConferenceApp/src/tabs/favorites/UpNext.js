import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import { compose } from 'recompose';
import GradientView from 'react-native-linear-gradient';
import PropTypes from 'prop-types';

import {
  TouchableScale,
  H5,
  PaddedView,
  styled,
  withThemeMixin,
  withTheme,
} from '@apollosproject/ui-kit';
import ContentCardConnected from '../../ui/ContentCardConnected';

const HeaderBackgroundView = compose(
  styled(({ theme }) => ({
    paddingVertical: 0,
    backgroundColor: theme.colors.tertiary,
  })),
  withThemeMixin({ type: 'dark' })
)(PaddedView);

const CardBackground = withTheme(({ theme }) => ({
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
  locations: [0, 0.4999, 0.49999],
  colors: [
    theme.colors.tertiary,
    theme.colors.tertiary,
    theme.colors.transparent,
  ],
}))(GradientView);

class UpNext extends PureComponent {
  handleOnPress = () =>
    this.props.id
      ? this.props.navigation.navigate('ContentSingle', {
          itemId: this.props.id,
        })
      : null;

  render() {
    return (
      <React.Fragment>
        <HeaderBackgroundView vertical={false}>
          <H5>Up Next for You</H5>
        </HeaderBackgroundView>
        <CardBackground>
          <TouchableScale onPress={this.handleOnPress}>
            <ContentCardConnected contentId={this.props.id} />
          </TouchableScale>
        </CardBackground>
      </React.Fragment>
    );
  }
}

UpNext.propTypes = {
  id: PropTypes.string,
};

export default withNavigation(UpNext);
