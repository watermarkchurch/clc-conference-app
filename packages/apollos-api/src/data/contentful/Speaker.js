import gql from "graphql-tag";
import { createGlobalId } from "@apollosproject/server-core";
import ContentfulDataSource from "./ContentfulDataSource";

export class dataSource extends ContentfulDataSource {}

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
`;

export const resolver = {
  Speaker: {
    id: ({ sys }, args, context, { parentType }) =>
      createGlobalId(sys.id, parentType.name),
    name: ({ fields }) => fields.name,
    summary: ({ fields }) => fields.summary,
    biography: ({ fields }) => fields.summary,
    onConferenceDirectory: ({ fields }) => fields.onConferenceDirectory,
    coverImage: ({ fields }) => fields.photo,
    talks: ({ fields }) => fields.talks
  }
};
