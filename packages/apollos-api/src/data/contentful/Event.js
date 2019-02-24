import gql from "graphql-tag";
import { createGlobalId } from "@apollosproject/server-core";
import marked from "marked";
import ContentfulDataSource from "./ContentfulDataSource";

export class dataSource extends ContentfulDataSource {}

export const schema = gql`
  type Event implements ContentItem & Node {
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

    speakers: [Speaker]
    location: Location
    startTime: String
    endTime: String
    downloads: [ContentfulAsset]
  }
`;

export const resolver = {
  Event: {
    id: ({ sys }, args, context, { parentType }) =>
      createGlobalId(sys.id, parentType.name),
    title: ({ fields }) => fields.title,
    summary: ({ fields }) => fields.summary,
    htmlContent: ({ fields }) =>
      fields.description ? marked(fields.description) : null,
    speakers: ({ fields }) => fields.speakers,
    location: ({ fields }) => fields.location,
    startTime: ({ fields }) => fields.startTime,
    endTime: ({ fields }) => fields.endTime,
    downloads: ({ fields }) => fields.downloads
  }
};
