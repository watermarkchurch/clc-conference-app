import gql from 'graphql-tag';
import { createGlobalId } from '@apollosproject/server-core';
import marked from 'marked';
import ContentfulDataSource from './ContentfulDataSource';

export class dataSource extends ContentfulDataSource {
  getAll = async () => {
    const result = await this.get(`entries`, {
      content_type: 'speaker',
      'fields.isOnConferenceDirectory': true,
    });
    return result;
  };

  getLinkedEntries = async ({ sys }) => {
    const result = await this.get(`entries`, {
      links_to_entry: sys.id,
    });
    return result;
  };
}

export const schema = gql`
  type Speaker implements Node & ContentItem {
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
  }

  extend type Query {
    speakers: [Speaker]
  }
`;

export const resolver = {
  Query: {
    speakers: (_, args, { dataSources }) => dataSources.Speaker.getAll(),
  },
  Speaker: {
    id: ({ sys }, args, context, { parentType }) =>
      createGlobalId(sys.id, parentType.name),
    title: ({ fields }) => fields.name,
    summary: (node, args, { dataSources }) =>
      dataSources.ContentItem.createSummary(node),
    htmlContent: ({ fields }) =>
      fields.biography ? marked(fields.biography) : '',
    coverImage: ({ fields }) => fields.photo,
    childContentItemsConnection: (node, args, { dataSources }) =>
      dataSources.Speaker.getLinkedEntries(node),
  },
};
