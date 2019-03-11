import React from 'react';
import { ScrollView } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import {
  styled,
  GradientOverlayImage,
  BackgroundView,
  PaddedView,
  H2,
} from '@apollosproject/ui-kit';
import MediaControls from '../MediaControls';
import HTMLContent from '../HTMLContent';
import ChildContentFeed from '../ChildContentFeed';
import Speakers from './Speakers';

const FlexedScrollView = styled({ flex: 1 })(ScrollView);

const UniversalContentItem = ({ content, loading }) => {
  const coverImageSources = get(content, 'coverImage.sources', []);
  return (
    <FlexedScrollView>
      {coverImageSources.length || loading ? (
        <GradientOverlayImage
          isLoading={!coverImageSources.length && loading}
          source={coverImageSources}
        />
      ) : null}
      <SafeAreaView forceInset={{ bottom: 'always' }}>
        <BackgroundView>
          <MediaControls contentId={content.id} />
          <PaddedView>
            <H2 padded isLoading={!content.title && loading}>
              {content.title}
            </H2>
            <HTMLContent contentId={content.id} />
          </PaddedView>
          <Speakers contentId={content.id} />
          <ChildContentFeed contentId={content.id} />
        </BackgroundView>
      </SafeAreaView>
    </FlexedScrollView>
  );
};

UniversalContentItem.propTypes = {
  content: PropTypes.shape({
    __typename: PropTypes.string,
    parentChannel: PropTypes.shape({
      name: PropTypes.string,
    }),
    id: PropTypes.string,
    htmlContent: PropTypes.string,
    title: PropTypes.string,
    scriptures: PropTypes.arrayOf(
      PropTypes.shape({
        /** The ID of the verse (i.e. '1CO.15.57') */
        id: PropTypes.string,
        /** A human readable reference (i.e. '1 Corinthians 15:57') */
        reference: PropTypes.string,
        /** The scripture source to render */
        html: PropTypes.string,
      })
    ),
  }),
  loading: PropTypes.bool,
};

export default UniversalContentItem;
