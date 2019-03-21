import gql from 'graphql-tag';
import { createGlobalId } from '@apollosproject/server-core';
import ContentfulDataSource from './ContentfulDataSource';

export class dataSource extends ContentfulDataSource {}

export const schema = gql`
  type Link implements Node {
    id: ID!
    title: String
    url: String
    useInAppBrowser: Boolean
  }
`;

export const resolver = {
  Link: {
    id: ({ sys }, args, context, { parentType }) =>
      createGlobalId(sys.id, parentType.name),
    title: ({ fields }) => fields.title,
    url: ({ fields }) => fields.url,
    useInAppBrowser: ({ fields }) => fields.useInAppBrowser,
  },
};
