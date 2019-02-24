import gql from "graphql-tag";
import { createGlobalId } from "@apollosproject/server-core";
import ContentfulDataSource from "./ContentfulDataSource";

export class dataSource extends ContentfulDataSource {
  getFromCode = async code => {
    const result = await this.get(`entries`, {
      content_type: "conference",
      "fields.code": code
    });
    if (result.length === 0)
      throw new Error(`Conference with code ${code} could not be found.`);
    return result[0];
  };
}

export const schema = gql`
  type Conference implements Node {
    id: ID!
    title: String
    code: String
    days: [ConferenceDay]
    announcements: ContentItemsConnection
    tracks: [ConferenceTrack]
  }

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
    days: ({ fields }) => fields.days,
    announcements: ({ fields }) => fields.announcements
  }
};
