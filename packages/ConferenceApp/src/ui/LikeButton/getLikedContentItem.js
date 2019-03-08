import gql from 'graphql-tag';

export default gql`
  query getLikedContentItem($itemId: ID!) {
    node(id: $itemId) {
      id
      isLiked @client
    }
  }
`;
