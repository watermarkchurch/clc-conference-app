import gql from 'graphql-tag';

export default gql`
  query getHorizontalContent($itemId: ID!) {
    node(id: $itemId) {
      ... on ContentItem {
        id
        childContentItemsConnection {
          edges {
            node {
              id
              coverImage {
                name
                sources {
                  uri
                }
              }
              title
            }
          }
        }
        siblingContentItemsConnection {
          edges {
            node {
              id
              coverImage {
                name
                sources {
                  uri
                }
              }
              title
            }
          }
        }
      }
    }
  }
`;
