import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import { compose } from 'recompose';
import GradientView from 'react-native-linear-gradient';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

import {
  TouchableScale,
  H5,
  PaddedView,
  styled,
  withThemeMixin,
  withTheme,
  Card,
} from '@apollosproject/ui-kit';
import gql from 'graphql-tag';
import ScheduleItem from '../../ui/ScheduleItem';

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

const ScheduleItemWithSpacing = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit,
  height: null,
}))(ScheduleItem);

const query = gql`
  query($likedIds: [ID]) {
    conference {
      upNext(likedIds: $likedIds) {
        id
        title
        summary
        ... on Event {
          startTime
          endTime
        }
        ... on Breakouts {
          startTime
          endTime
        }
      }
    }
  }
`;

class UpNext extends PureComponent {
  handleOnPress = (id) =>
    id
      ? this.props.navigation.navigate('ContentSingle', {
          itemId: id,
        })
      : null;

  render() {
    return (
      <Query
        query={query}
        variables={{ likedIds: this.props.likedIds }}
        fetchPolicy={'network-only'}
      >
        {({ data: { conference: { upNext = {} } = {} } = {} }) => (
          <React.Fragment>
            <HeaderBackgroundView vertical={false}>
              <H5>Up Next for You</H5>
            </HeaderBackgroundView>
            <CardBackground>
              <TouchableScale onPress={() => this.handleOnPress(upNext.id)}>
                <Card>
                  <ScheduleItemWithSpacing {...upNext} />
                </Card>
              </TouchableScale>
            </CardBackground>
          </React.Fragment>
        )}
      </Query>
    );
  }
}

UpNext.propTypes = {
  likedIds: PropTypes.arrayOf(PropTypes.string),
};

export default withNavigation(UpNext);
