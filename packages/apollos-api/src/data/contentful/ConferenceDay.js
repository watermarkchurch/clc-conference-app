import gql from 'graphql-tag';
import { createGlobalId } from '@apollosproject/server-core';
import ContentfulDataSource from './ContentfulDataSource';

export class dataSource extends ContentfulDataSource {}

export const schema = gql`
  type ConferenceDay implements ContentChannel & Node {
    id: ID!
    title: String
    childContentItemsConnection(
      first: Int
      after: String
    ): ContentItemsConnection
    date: String!
  }
`;

export const resolver = {
  ConferenceDay: {
    id: ({ sys }, args, context, { parentType }) =>
      createGlobalId(sys.id, parentType.name),
    title: ({ fields }) => fields.title,
    date: ({ fields }) => fields.date,
    childContentItemsConnection: ({ fields: { scheduleItem = [] } = {} }) =>
      scheduleItem.sort(
        (a, b) => new Date(a.fields.startTime) - new Date(b.fields.startTime)
      ),
  },
};
