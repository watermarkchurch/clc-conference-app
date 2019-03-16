import gql from 'graphql-tag';
import { createGlobalId } from '@apollosproject/server-core';
import ContentfulDataSource from './ContentfulDataSource';

export class dataSource extends ContentfulDataSource {}

export const schema = gql`
  type Location implements Node {
    id: ID!
    title: String
    summary: String
    map: ImageMedia
  }
`;

export const resolver = {
  Location: {
    id: ({ sys }, args, context, { parentType }) =>
      createGlobalId(sys.id, parentType.name),
    title: ({ fields }) => fields.title,
    summary: ({ fields }) => fields.summary,
    map: ({ fields }) => fields.map,
  },
};
