import gql from 'graphql-tag';

export const contentItemFragment = gql`
  fragment contentItemFragment on ContentItem {
    id
    title
    summary
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
    }
  }
  ${contentItemFragment}
`;
