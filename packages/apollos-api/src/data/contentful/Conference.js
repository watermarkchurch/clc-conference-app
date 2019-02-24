import gql from "graphql-tag";
import { createGlobalId } from "@apollosproject/server-core";
import ContentfulDataSource from "./ContentfulDataSource";

export class dataSource extends ContentfulDataSource {
  getFromCode = async code => {
    const result = await this.get(`entries`, {
      content_type: "conference",
      "fields.code": code
    });
    if (result.items.length === 0)
      throw new Error(`Conference with code ${code} could not be found.`);
    return result.items[0];
  };
}

export const schema = gql`
  type Conference implements Node {
    id: ID!
    title: String
    code: String
    days: [ConferenceDay]
    announcements: ContentItemsConnection
    # tracks: [ConferenceTrack]
  }

  # type Track implements ContentChannel & Node {
  #   id: ID!
  #   name: String!
  #   description: String!
  #   childContentItemsConnection(
  #     first: Int
  #     after: String
  #   ): ContentItemsConnection
  # }

  # type Breakouts implements ContentChannel & Node {
  #   id: ID!
  #   name: String!
  #   description: String!
  #   childContentItemsConnection(
  #     first: Int
  #     after: String
  #   ): ContentItemsConnection
  #   startTime: String!
  #   endTime: String!
  # }

  extend type Query {
    conference(code: String): Conference
  }
`;

export const resolver = {
  Query: {
    conference: (_, { code }, { dataSources }) =>
      dataSources.Conference.getFromCode(code)
  },
  Conference: {
    id: ({ sys }, args, context, { parentType }) =>
      createGlobalId(sys.id, parentType.name),
    title: ({ fields }) => fields.title,
    code: ({ fields }) => fields.code,
    days: ({ fields, includes }) => {
      const links = fields.days;
      return links.map(link => {
        if (link.sys.type !== "Link") return link;
        return includes[link.sys.linkType].find(
          entry => entry.sys.id === link.sys.id
        );
      });
    }
  }
};
