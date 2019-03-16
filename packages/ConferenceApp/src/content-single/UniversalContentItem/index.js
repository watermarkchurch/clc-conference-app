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
import HTMLContent from '../HTMLContent';
import ChildContentFeed from '../ChildContentFeed';
import Location from './Location';
import Speakers from './Speakers';
import Time from './Time';

const FlexedScrollView = styled({ flex: 1 })(ScrollView);

const ContentContainer = styled(({ hasCoverImage, theme }) => ({
  paddingTop: hasCoverImage ? 0 : theme.sizing.baseUnit,
  paddingBottom: 0,
}))(PaddedView);

const UniversalContentItem = ({ content, loading }) => {
  const coverImageSources = get(content, 'coverImage.sources', []);
  return (
    <BackgroundView>
      <FlexedScrollView>
        {coverImageSources.length ||
        (loading && get(content, 'coverImage') !== null) ? (
          <GradientOverlayImage
            isLoading={!coverImageSources.length && loading}
            source={coverImageSources}
          />
        ) : null}
        <SafeAreaView forceInset={{ bottom: 'always' }}>
          <ContentContainer
            hasCoverImage={coverImageSources && coverImageSources.length}
          >
            <H2 padded isLoading={!content.title && loading}>
              {content.title}
            </H2>
            <HTMLContent contentId={content.id} />
          </ContentContainer>
          <Time contentId={content.id} />
          <Location contentId={content.id} />
          <ChildContentFeed contentId={content.id} />
          <Speakers contentId={content.id} />
        </SafeAreaView>
        <PaddedView />
      </FlexedScrollView>
    </BackgroundView>
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
