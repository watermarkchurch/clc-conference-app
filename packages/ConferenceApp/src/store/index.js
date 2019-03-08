import { merge, get } from 'lodash';
import gql from 'graphql-tag';
import { track, events } from '../analytics';
import { CACHE_LOADED } from '../client'; // eslint-disable-line
import updatePushId from '../notifications/updatePushId';
// TODO: this will require more organization...ie...not keeping everything in one file.
// But this is simple while our needs our small.

export const schema = `
  type Query {
    mediaPlayer: MediaPlayerState
    devicePushId: String
    cacheLoaded: Boolean
    likedContent: [Node]
  }

  extend type Node {
    isLiked: Boolean
  }

  type Mutation {
    mediaPlayerUpdateState(isPlaying: Boolean, isFullscreen: Boolean, isVisible: Boolean): Boolean
    mediaPlayerSetPlayhead(currentTime: Float): Boolean
    mediaPlayerPlayNow(
      parentId: ID,
      mediaSource: VideoMediaSource!,
      posterSources: [ImageMediaSource],
      title: String,
      artist: String,
      isVideo: Boolean,
    ): Boolean

    cacheMarkLoaded
    updateDevicePushId(pushId: String!)

    updateLikeEntity(input: LikeEntityInput!)
  }

  enum LIKE_OPERATION {
    Like
    Unlike
  }

  input LikeEntityInput {
    nodeId: ID!
    operation: LIKE_OPERATION!
  }

  type MediaPlayerState {
    currentTrack: MediaPlayerTrack
    isPlaying: Boolean
    isFullscreen: Boolean
    isVisible: Boolean
    currentTime: Float
  }

  type MediaPlayerProgress {
    currentTime: Float
    playableDuration: Float
    seekableDuration: Float
    duration: Float
  }

  type MediaPlayerTrack {
    id: ID!
    parentId: ID
    mediaSource: VideoMediaSource!
    posterSources: [ImageMediaSource]
    title: String
    artist: String
    isVideo: Boolean
  }
`;

export const defaults = {
  __typename: 'Query',
  cacheLoaded: false,
  pushId: null,
  mediaPlayer: {
    __typename: 'MediaPlayerState',
    currentTrack: null,
    isPlaying: false,
    isFullscreen: false,
    isVisible: false,
    currentTime: 0,
    showVideo: true,
    muted: false,
  },
  likedContent: [],
};

let trackId = 0;

const getIsLoggedIn = gql`
  query {
    isLoggedIn @client
  }
`;

export const resolvers = {
  Query: {
    node: (root, { id }, { cache }) => {
      const query = gql`
        query {
          likedContent @client {
            id
          }
        }
      `;

      let likedContent = [];

      try {
        ({ likedContent } = cache.readQuery({ query }));
      } catch (e) {
        likedContent = [];
      }

      return { isLiked: !!likedContent.find((content) => content.id === id) };
    },
  },
  Mutation: {
    updateLikeEntity: (root, { input }, { cache }) => {
      const query = gql`
        query {
          likedContent @client {
            id
          }
        }
      `;

      let likedContent = [];

      try {
        ({ likedContent } = cache.readQuery({ query }));
      } catch (e) {
        likedContent = [];
      }

      const node = {
        id: input.nodeId,
        __typename: input.nodeId.split(':')[0],
        isLiked: input.operation === 'Like',
      };

      const isLiked = likedContent.find(({ id }) => id === input.nodeId);

      if (input.operation === 'Unlike' && isLiked) {
        likedContent = likedContent.filter(({ id }) => id !== input.nodeId);
      } else if (!isLiked) {
        likedContent.push(node);
      }

      cache.writeQuery({ query, data: { likedContent } });
      return node;
    },
    mediaPlayerPlayNow: (root, trackInfo, { cache }) => {
      const query = gql`
        query {
          mediaPlayer {
            isFullscreen
          }
        }
      `;
      const mediaTrack = merge(
        {
          __typename: 'MediaPlayerTrack',
          parentId: null,
          mediaSource: null,
          posterSources: null,
          title: null,
          artist: null,
          isVideo: false,
        },
        trackInfo
      );

      const { mediaPlayer } = cache.readQuery({ query });

      const newMediaPlayerState = {
        __typename: 'MediaPlayerState',
        isPlaying: true,
        isVisible: true,
        isFullscreen: mediaTrack.isVideo
          ? true
          : (mediaPlayer && mediaPlayer.isFullscreen) || false,
        currentTrack: mediaTrack,
        currentTime: 0,
        showVideo: mediaTrack.isVideo,
        muted: false,
      };

      if (
        // if same track
        mediaPlayer &&
        mediaPlayer.currentTrack &&
        mediaPlayer.currentTrack.mediaSource.uri === mediaTrack.mediaSource.uri
      ) {
        // use the same Id
        newMediaPlayerState.currentTrack.id = mediaPlayer.currentTrack.id;
      } else {
        // otherwise reset progress and use new Id
        newMediaPlayerState.currentTrack.id = trackId;
        newMediaPlayerState.progress = null;
        trackId += 1;
      }

      cache.writeData({
        query,
        data: {
          mediaPlayer: newMediaPlayerState,
        },
      });

      track({
        eventName: events.UserPlayedMedia,
        properties: {
          uri: mediaTrack.uri,
          title: mediaTrack.title,
          type: mediaTrack.isVideo ? 'Video' : 'Audio',
        },
      });
      return null;
    },
    mediaPlayerUpdateState: (
      root,
      { isPlaying, isFullscreen, isVisible, showVideo, muted },
      { cache }
    ) => {
      const query = gql`
        query {
          mediaPlayer @client {
            isPlaying
            isFullscreen
            isVisible
            showVideo
            muted
          }
        }
      `;
      const { mediaPlayer } = cache.readQuery({ query });
      cache.writeQuery({
        query,
        data: {
          mediaPlayer: merge(mediaPlayer, {
            isPlaying,
            isFullscreen,
            isVisible,
            showVideo,
            muted,
            __typename: 'MediaPlayerState',
          }),
        },
      });
      return null;
    },
    mediaPlayerSetPlayhead: (root, { currentTime }, { cache }) => {
      const query = gql`
        query {
          mediaPlayer @client {
            currentTime
          }
        }
      `;
      const { mediaPlayer } = cache.readQuery({ query });
      cache.writeQuery({
        query,
        data: {
          mediaPlayer: {
            __typename: 'MediaPlayerState',
            currentTime:
              currentTime || get(mediaPlayer.progress, 'currentTime') || 0,
          },
        },
      });
      return null;
    },
    updateDevicePushId: async (root, { pushId }, { cache, client }) => {
      const query = gql`
        query {
          pushId @client
        }
      `;
      cache.writeQuery({
        query,
        data: {
          pushId,
        },
      });

      const { data: { isLoggedIn } = {} } = await client.query({
        query: getIsLoggedIn,
      });

      if (isLoggedIn) {
        updatePushId({ pushId });
      }
      return null;
    },

    cacheMarkLoaded: async (root, args, { cache, client }) => {
      cache.writeQuery({
        query: CACHE_LOADED,
        data: {
          cacheLoaded: true,
        },
      });
      const { data: { isLoggedIn } = {} } = await client.query({
        query: getIsLoggedIn,
      });

      const { pushId } = cache.readQuery({
        query: gql`
          query {
            pushId @client
          }
        `,
      });

      if (isLoggedIn && pushId) {
        updatePushId({ pushId });
      }
      return null;
    },
  },
};
