import dotenv from 'dotenv/config'; // eslint-disable-line
import appdynamics from 'appdynamics';
import config from './config'; // eslint-disable-line
import server from './server';

export { testSchema } from './server'; // eslint-disable-line import/prefer-default-export

if (
  process.env.APPD_HOST &&
  process.env.APPD_ACCOUNTNAME &&
  process.env.APPD_ACCESSKEY
) {
  appdynamics.profile({
    controllerHostName: process.env.APPD_HOST,
    controllerPort: 443,
    controllerSslEnabled: true,
    accountName: process.env.APPD_ACCOUNTNAME,
    accountAccessKey: process.env.APPD_ACCESSKEY,
    applicationName: 'wcc-clc-api',
    tierName: 'heroku-web',
    nodeName: 'heroku-dyno',
  });
}

// Use the port, if provided.
const { PORT } = process.env;
if (!PORT && process.env.NODE_ENV !== 'test')
  console.warn(
    'Add `ENV=4000` if you are having trouble connecting to the server. By default, PORT is random.'
  );

server.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://0.0.0.0:${PORT}`);
});
