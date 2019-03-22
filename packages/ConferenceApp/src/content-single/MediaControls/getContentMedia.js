import gql from 'graphql-tag';

export default gql`
  query getContentMedia($contentId: ID!) {
    node(id: $contentId) {
      ... on ContentItem {
        id
        title
        coverImage {
          sources {
            uri
          }
        }
        media {
          uri
        }
      }
    }
  }
`;
