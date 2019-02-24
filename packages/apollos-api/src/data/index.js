import { gql } from "apollo-server";

import { createApolloServerConfig } from "@apollosproject/server-core";

import * as Analytics from "@apollosproject/data-connector-analytics";
// import * as Scripture from "@apollosproject/data-connector-bible";
// import * as LiveStream from "@apollosproject/data-connector-church-online";
import * as Cloudinary from "@apollosproject/data-connector-cloudinary";
// import * as OneSignal from "@apollosproject/data-connector-onesignal";
// import * as Pass from "@apollosproject/data-connector-passes";
// import {
//   Followings,
//   Interactions,
//   RockConstants,
//   Family,
//   Person,
//   ContentItem,
//   ContentChannel,
//   Sharable,
//   Auth,
//   PersonalDevice,
//   Template
// } from "@apollosproject/data-connector-rock";
import {
  // peopleSchema,
  themeSchema
  // scriptureSchema
} from "@apollosproject/data-schema";

import * as ContentfulData from "./contentful";

const data = {
  Cloudinary,
  Analytics,
  // OneSignal,
  // People: { schema: peopleSchema },
  Theme: { schema: themeSchema },
  // Scripture: { schema: scriptureSchema },
  ...ContentfulData
};

const {
  dataSources,
  resolvers,
  schema,
  context,
  applyServerMiddleware
} = createApolloServerConfig(data);

export { dataSources, resolvers, schema, context, applyServerMiddleware };

// the upload Scalar is added
export const testSchema = [
  gql`
    scalar Upload
  `,
  ...schema
];
