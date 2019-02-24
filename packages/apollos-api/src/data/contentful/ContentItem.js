import gql from "graphql-tag";
import { camelCase, upperFirst } from "lodash";

import ContentfulDataSource from "./ContentfulDataSource";

const enforceProtocol = uri => (uri.startsWith("//") ? `https:${uri}` : uri);

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

  type ContentfulAsset implements Media {
    name: String
    description: String
    key: String
    sources: [ContentfulMediaSource]
  }

  type ContentfulMediaSource implements MediaSource {
    uri: String
    contentType: String
  }
`;

export const resolver = {
  ContentItem: {
    __resolveType: ({ sys }) => {
      const contentfulType = sys.contentType.sys.id;
      return upperFirst(camelCase(contentfulType));
    }
  },
  ContentfulAsset: {
    name: ({ fields }) => fields.name,
    description: ({ fields }) => fields.description,
    key: ({ fields }) => fields.name,
    sources: ({ fields }) => [fields.file]
  },
  ImageMedia: {
    name: ({ fields }) => fields.name,
    key: ({ fields }) => fields.name,
    sources: ({ fields }) => [fields.file]
  },
  ContentfulMediaSource: {
    uri: ({ url }) => enforceProtocol(url)
  },
  ImageMediaSource: {
    uri: ({ url }) => enforceProtocol(url)
  },
  ContentItemsConnection: {
    edges: items =>
      items.map(node => ({
        node,
        cursor: null
      }))
  }
};