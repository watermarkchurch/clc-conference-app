import gql from 'graphql-tag';

export const contentItemFragment = gql`
  fragment contentItemFragment on ContentItem {
    id
    title
    summary
    ... on Event {
      label
    }
    coverImage {
      name
      sources {
        uri
      }
    }
  }
`;

export default gql`
  query getContentItem($itemId: ID!) {
    node(id: $itemId) {
      __typename
      id
      isLiked @client
      ... on ContentItem {
        ...contentItemFragment
      }
      ... on Speaker {
        id
        title
      }
      ... on Location {
        id
        map {
          sources {
            uri
          }
        }
      }
    }
  }
  ${contentItemFragment}
`;
