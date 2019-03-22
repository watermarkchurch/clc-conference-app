import gql from 'graphql-tag';
import { createGlobalId } from '@apollosproject/server-core';
import marked from 'marked';
import ContentfulDataSource from './ContentfulDataSource';

export class dataSource extends ContentfulDataSource {}

export const schema = gql`
  type Announcement implements ContentItem & Node {
    id: ID!
    title: String
    coverImage: ImageMedia

    htmlContent: String
    summary: String

    media: VideoMediaSource

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
`;

export const resolver = {
  Announcement: {
    id: ({ sys }, args, context, { parentType }) =>
      createGlobalId(sys.id, parentType.name),
    title: ({ fields }) => fields.title,
    summary: (node, args, { dataSources }) =>
      dataSources.ContentItem.createSummary(node),
    htmlContent: ({ fields }) =>
      fields.description ? marked(fields.description) : null,
    coverImage: ({ fields }) => fields.art,
    media: ({ fields }) => ({ uri: fields.mediaUrl }),
  },
};
