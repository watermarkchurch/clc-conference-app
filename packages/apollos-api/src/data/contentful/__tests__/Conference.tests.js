import { apolloServer } from 'apollos-api/src/server';
import { createTestClient } from 'apollo-server-testing';
import fetch from 'jest-fetch-mock';

describe('Conference', () => {
  beforeEach(() => {
    fetch.mockContentful();
  });

  it('gets the conference', async () => {
    const getConference = `
      query {
        conference {
          id
          title
          code
        }
      }
    `;

    const { query } = createTestClient(apolloServer);
    const result = await query({ query: getConference });
    expect(result).toMatchSnapshot();
  });

  describe('UpNext', () => {
    it('gets the first event', async () => {
      Date.now = jest.fn(() => 1546322400000);

      const getConference = `
        query {
          conference {
            upNext {
              id
              title
              ...on Event {
                startTime
                endTime
              }
            }
          }
        }
      `;

      const { query } = createTestClient(apolloServer);
      const result = await query({ query: getConference });
      expect(result).toMatchSnapshot();
    });

    it('gets the second event', async () => {
      Date.now = jest.fn(() => 1554139800000);

      const getConference = `
        query {
          conference {
            upNext {
              id
              title
              ...on Event {
                startTime
                endTime
              }
            }
          }
        }
      `;

      const { query } = createTestClient(apolloServer);
      const result = await query({ query: getConference });
      expect(result).toMatchSnapshot();
    });

    it('gets nested liked events', async () => {
      Date.now = jest.fn(() => 1554307200000);

      const getConference = `
        query {
          conference {
            upNext(likedIds: ["Event:0cadc8706009779ee2d54b650930695e7669398b5e6ad4d34a375a728a696382"]) {
              id
              title
              ...on Event {
                startTime
                endTime
              }
            }
          }
        }
      `;

      const { query } = createTestClient(apolloServer);
      const result = await query({ query: getConference });
      expect(result).toMatchSnapshot();
    });
  });
});
