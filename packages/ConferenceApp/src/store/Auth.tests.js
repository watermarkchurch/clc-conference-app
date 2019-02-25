import { client } from 'ConferenceApp/src/client';

import { resolvers } from '.';

describe('Auth Store', () => {
  it('logs a user out', async () => {
    client.cache.writeData({ data: { authToken: 'some-auth-token' } });
    resolvers.Mutation.logout({}, {}, { cache: client.cache });
    expect(client.cache).toMatchSnapshot();
  });
});
