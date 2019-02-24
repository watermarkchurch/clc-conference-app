import gql from "graphql-tag";
import { camelCase, upperFirst } from "lodash";
import { withEdgePagination } from "@apollosproject/server-core";

import ContentfulDataSource from "./ContentfulDataSource";

export class dataSource extends ContentfulDataSource {
  getByType = type =>
    this.get(`entries`, {
      content_type: type
    });
}

export const schema = gql`
  interface ContentItem {
    id: ID!
    title: String
    coverImage: ImageMedia

    htmlContent: String
    summary: String

    childContentItemsConnection(
      first: Int
      after: String
    ): ContentItemsConnection
    siblingContentItemsConnection(
      first: Int
      after: String
    ): ContentItemsConnection

    parentChannel: ContentChannel
  }

  input ContentItemsConnectionInput {
    first: Int
    after: String
  }
  type ContentItemsConnection {
    edges: [ContentItemsConnectionEdge]
    # TODO totalCount: Int
    pageInfo: PaginationInfo
  }
  type ContentItemsConnectionEdge {
    node: ContentItem
    cursor: String
  }
`;

export const resolver = {
  ContentItem: {
    __resolveType: ({ sys }) => {
      const contentfulType = sys.contentType.sys.id;
      return upperFirst(camelCase(contentfulType));
    }
  },
  ContentItemsConnection: {
    edges: items =>
      items.map(node => ({
        node,
        cursor: null
      }))
    // pageInfo: null
  }
};
