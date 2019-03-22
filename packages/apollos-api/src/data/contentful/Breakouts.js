import gql from 'graphql-tag';
import { createGlobalId } from '@apollosproject/server-core';
import marked from 'marked';
import ContentfulDataSource from './ContentfulDataSource';

export class dataSource extends ContentfulDataSource {
  getFromEvent = async (id) => {
    const result = await this.get(`entries`, {
      'fields.breakouts.sys.id': id,
      content_type: 'breakouts',
    });
    if (result.length === 0)
      throw new Error(`Entry with contentful ID ${id} could not be found.`);
    return result[0];
  };
}

export const schema = gql`
  type Breakouts implements ContentItem & Node {
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
    media: VideoMediaSource

    parentChannel: ContentChannel

    startTime: String
    endTime: String
  }
`;

export const resolver = {
  Breakouts: {
    id: ({ sys }, args, context, { parentType }) =>
      createGlobalId(sys.id, parentType.name),
    title: ({ fields }) => fields.title,
    summary: (node, args, { dataSources }) =>
      dataSources.ContentItem.createSummary(node),
    htmlContent: ({ fields }) =>
      fields.description ? marked(fields.description) : null,
    childContentItemsConnection: ({ fields }) => fields.breakouts,
    startTime: ({ fields }) => fields.startTime,
    endTime: ({ fields }) => fields.endTime,
    coverImage: ({ fields }) => fields.art,
  },
};
