import gql from 'graphql-tag';
import { parseGlobalId, createGlobalId } from '@apollosproject/server-core';
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
    announcements: ContentItemsConnection @cacheControl(maxAge: 0)
    tracks: [ConferenceTrack]
    maps: [Location]
    upNext(likedIds: [ID]): ContentItem @cacheControl(maxAge: 0)
    resources: [Resource]
  }

  union Resource = Announcement | Link

  extend type Query {
    conference(code: String): Conference
  }
`;

export const resolver = {
  Query: {
    conference: (_, { code = CONFERENCE_CODE }, { dataSources }) =>
      dataSources.Conference.getFromCode(code),
  },
  Resource: {
    __resolveType: ({ sys }) => {
      const type = sys.contentType.sys.id || '';
      return type.charAt(0).toUpperCase() + type.slice(1);
    },
  },
  Conference: {
    id: ({ sys }, args, context, { parentType }) =>
      createGlobalId(sys.id, parentType.name),
    title: ({ fields }) => fields.title,
    code: ({ fields }) => fields.code,
    days: ({ fields }) => fields.days,
    announcements: ({ fields }) => fields.announcements,
    tracks: ({ fields }) => fields.tracks,
    maps: ({ fields }) => fields.maps,
    resources: ({ fields }) => fields.resources,
    upNext: ({ fields }, { likedIds = [] }) => {
      const currentTime = moment();

      // find the current day:
      let { days = [] } = fields;
      days = days.sort((a, b) => moment(a.fields.date) - moment(b.fields.date));

      let upNext = null;
      let startTimeToBeBefore = null;
      days.find(({ fields: { scheduleItem = [] } = {} }) =>
        scheduleItem.find((item) => {
          // look for an event that's less then halfway over or after currentTime
          const startTime = moment(item.fields.startTime);
          const endTime = moment(item.fields.endTime);
          if (startTime > currentTime) {
            if (upNext && moment(upNext.startTime) < startTime) return true;
            if (!startTimeToBeBefore || startTime < startTimeToBeBefore)
              upNext = item;
          }

          const halfwayOverTime = startTime + (endTime - startTime) / 2;
          if (halfwayOverTime > currentTime) {
            upNext = item;
            startTimeToBeBefore = halfwayOverTime;
          }

          if (upNext && likedIds.includes(upNext.id)) {
            return true;
          }

          return false;
        })
      );

      if (likedIds) {
        const parsedLikedIds = likedIds.map((id) => parseGlobalId(id).id);
        const childNodes = upNext.fields.breakouts || [];
        if (childNodes.length) {
          childNodes.find((node) => {
            if (parsedLikedIds.includes(node.sys.id)) {
              upNext = node;
              return true;
            }
            return false;
          });
        }
      }

      return upNext;
    },
  },
};
