import gql from 'graphql-tag';

export default gql`
  query getChildContent($itemId: ID!) {
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
              summary
            }
          }
        }
      }
    }
  }
`;
