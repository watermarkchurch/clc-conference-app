import gql from 'graphql-tag';
import { createGlobalId } from '@apollosproject/server-core';
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
  type Speaker implements Node {
    id: ID!
    name: String
    summary: String
    biography: String
    onConferenceDirectory: Boolean

    coverImage: ImageMedia

    talks: [ContentItem]
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
    name: ({ fields }) => fields.name,
    summary: ({ fields }) => fields.summary,
    biography: ({ fields }) => fields.summary,
    onConferenceDirectory: ({ fields }) => fields.onConferenceDirectory,
    coverImage: ({ fields }) => fields.photo,
    talks: ({ fields }) => fields.talks,
  },
};
