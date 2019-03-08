import gql from 'graphql-tag';
import { createGlobalId } from '@apollosproject/server-core';
import moment from 'moment';
import ContentfulDataSource from './ContentfulDataSource';

const CONFERENCE_CODE = 'CLC2019'; // todo: move into .env

export class dataSource extends ContentfulDataSource {
  getFromCode = async (code) => {
    const result = await this.get(`entries`, {
      content_type: 'conference',
      'fields.code': code,
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
    upNext: ContentItem
  }

  extend type Query {
    conference(code: String): Conference
  }
`;

export const resolver = {
  Query: {
    conference: (_, { code }, { dataSources }) =>
      dataSources.Conference.getFromCode(code || CONFERENCE_CODE),
  },
  Conference: {
    id: ({ sys }, args, context, { parentType }) =>
      createGlobalId(sys.id, parentType.name),
    title: ({ fields }) => fields.title,
    code: ({ fields }) => fields.code,
    days: ({ fields }) => fields.days,
    announcements: ({ fields }) => fields.announcements,
    upNext: ({ fields }) => {
      const currentTime = moment();

      // find the current day:
      let { days = [] } = fields;
      days = days.sort(
        (a, b) => new Date(a.fields.startTime) - new Date(b.fields.startTime)
      );

      let upNext = null;
      let startTimeToBeBefore = null;
      days.find(({ fields: { scheduleItem = [] } = {} }) =>
        scheduleItem.find((item) => {
          // look for an event that's less then halfway over or after currentTime
          const startTime = moment(item.fields.startTime);
          const endTime = moment(item.fields.endTime);
          if (startTime > currentTime) {
            if (!startTimeToBeBefore || startTime < startTimeToBeBefore)
              upNext = item;
            return true;
          }

          const halfwayOverTime = startTime + (endTime - startTime) / 2;
          if (halfwayOverTime > currentTime) {
            upNext = item;
            startTimeToBeBefore = halfwayOverTime;
          }

          return false;
        })
      );

      return upNext;
    },
  },
};
