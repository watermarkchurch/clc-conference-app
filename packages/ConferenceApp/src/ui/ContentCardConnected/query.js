import gql from 'graphql-tag';

export const coverImageFragment = gql`
  fragment coverImageFragment on ContentItem {
    coverImage {
      sources {
        uri
      }
    }
  }
`;

export const baseCardFragment = gql`
  fragment baseCardFragment on ContentItem {
    id
    __typename
    ...coverImageFragment
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
  ${coverImageFragment}
`;

export const tileCardFragment = gql`
  fragment tileCardFragment on ContentItem {
    ...baseCardFragment
  }
  ${baseCardFragment}
  ${coverImageFragment}
`;

export const largeCardFragment = gql`
  fragment largeCardFragment on ContentItem {
    ...baseCardFragment
  }
  ${baseCardFragment}
`;

const getContentCard = gql`
  query getContentCard($contentId: ID!, $tile: Boolean!) {
    node(id: $contentId) {
      id
      __typename
      ...tileCardFragment @include(if: $tile)
      ...largeCardFragment @skip(if: $tile)
    }
  }
  ${tileCardFragment}
  ${largeCardFragment}
`;

export default getContentCard;
