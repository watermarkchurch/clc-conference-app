import fetch from 'jest-fetch-mock';
import { Response, Headers } from 'apollo-server-env';
import config from './src/config'; // eslint-disable-line

import { conferences } from './contentfulMockData';

global.fetch = fetch;

const resolveWith = (data, url) =>
  Promise.resolve(
    new Response(JSON.stringify(data), {
      url,
      status: 200,
      statusText: 'OK',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
  );

// Mocks for Contentful:
fetch.mockContentful = () => {
  fetch.mockImplementation((request) => {
    console.log('Mock URL', request.url);
    if (request.url.includes('entries?content_type=conference&fields.code=')) {
      return resolveWith(conferences, request.url);
    }
    return Promise.reject();
  });
};
