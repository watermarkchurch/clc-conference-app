import gql from 'graphql-tag';
import { createGlobalId } from '@apollosproject/server-core';
import ContentfulDataSource from './ContentfulDataSource';

export class dataSource extends ContentfulDataSource {}

export const schema = gql`
  type ConferenceTrack implements ContentChannel & Node {
    id: ID!
    title: String
    childContentItemsConnection(
      first: Int
      after: String
    ): ContentItemsConnection
  }
`;

export const resolver = {
  ConferenceTrack: {
    id: ({ sys }, args, context, { parentType }) =>
      createGlobalId(sys.id, parentType.name),
    title: ({ fields }) => fields.title,
    childContentItemsConnection: ({ fields }) => fields.scheduleItem,
  },
};
