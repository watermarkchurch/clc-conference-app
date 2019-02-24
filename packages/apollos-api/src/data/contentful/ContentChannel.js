import gql from "graphql-tag";
import ContentfulDataSource from "./ContentfulDataSource";

export class dataModel extends ContentfulDataSource {}

export const schema = gql`
  interface ContentChannel {
    id: ID!
    title: String
    childContentItemsConnection(
      first: Int
      after: String
    ): ContentItemsConnection
  }
`;

export const resolver = {
  ContentChannel: {
    __resolveType: ({ sys }) => sys.type
  }
};
