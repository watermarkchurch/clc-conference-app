import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { Platform, View } from 'react-native';
import { compose } from 'recompose';
import gql from 'graphql-tag';
import { get } from 'lodash';

import { playVideoMutation } from 'ConferenceApp/src/ui/MediaPlayer/mutations';
import {
  styled,
  TouchableScale,
  H4,
  withThemeMixin,
} from '@apollosproject/ui-kit';
import Icon from '../../ui/Icon';
import { MediaPlayerSpacer } from '../../ui/MediaPlayer';
import getContentMedia from './getContentMedia';

const mediaPlayerIsVisibleQuery = gql`
  query {
    mediaPlayer @client {
      isVisible
    }
  }
`;

const buttonSizeDifferential = 4;

const MediaIcon = Icon; // todo: add back styles
const MediaButton = compose(
  withThemeMixin(() => ({ type: 'dark' })),
  styled(({ theme }) => ({
    // width: theme.sizing.baseUnit * buttonSizeDifferential,
    flexDirection: 'row',
    paddingHorizontal: theme.sizing.baseUnit,
    height: theme.sizing.baseUnit * buttonSizeDifferential,
    borderRadius: theme.sizing.baseUnit * (buttonSizeDifferential / 2),
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0, // remove default button border
    ...Platform.select(theme.shadows.default),
  }))
)(View);

/** MediaButtton "border styles" live in a seperate component so that Android places it's elevation
 * shadow in the right place. */
const MediaButtonBorder = styled(({ theme }) => ({
  borderRadius: theme.sizing.baseUnit * (buttonSizeDifferential / 2),
}))(View);

const ButtonText = styled({
  paddingLeft: 8,
})(H4);

const Container = styled(({ theme }) => ({
  position: 'absolute',
  bottom: theme.sizing.baseUnit,
  left: theme.sizing.baseUnit,
}))(View);

class MediaControls extends PureComponent {
  static propTypes = {
    contentId: PropTypes.string,
  };

  renderControls = ({
    loading,
    error,
    data: { node: { media, title, coverImage = {} } = {} } = {},
  }) => {
    if ((loading && !media) || error) return null;

    const coverImageSources = (coverImage && coverImage.sources) || [];

    return (
      <Mutation mutation={playVideoMutation}>
        {(play) => (
          <Container>
            {media && media.uri ? (
              <>
                <MediaButtonBorder>
                  <TouchableScale
                    onPress={() =>
                      play({
                        variables: {
                          mediaSource: media,
                          posterSources: coverImageSources,
                          title,
                          isVideo: !media.uri.includes('mp3'), // not a good way to do this, but works for MVP
                        },
                      })
                    }
                  >
                    <MediaButton type="primary" useForeground>
                      <MediaIcon name="play-solid" />
                      <ButtonText>Play</ButtonText>
                    </MediaButton>
                  </TouchableScale>
                </MediaButtonBorder>
                <MediaPlayerSpacer />
              </>
            ) : null}
          </Container>
        )}
      </Mutation>
    );
  };

  render() {
    if (!this.props.contentId) return null;
    return (
      <Query query={mediaPlayerIsVisibleQuery}>
        {({ data = {} }) =>
          get(data, 'mediaPlayer.isVisible') ? null : (
            <Query
              query={getContentMedia}
              fetchPolicy="cache-and-network"
              variables={{ contentId: this.props.contentId }}
            >
              {this.renderControls}
            </Query>
          )
        }
      </Query>
    );
  }
}

export default MediaControls;
