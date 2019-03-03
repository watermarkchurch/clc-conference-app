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
    summary: ({ fields }) => fields.summary,
    htmlContent: ({ fields }) =>
      fields.biography ? marked(fields.biography) : '',
    coverImage: ({ fields }) => fields.photo,
    childContentItemsConnection: ({ fields }) => fields.talks,
  },
};
