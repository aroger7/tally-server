const awsServerlessExpress = require('aws-serverless-express');
const http = require('http');
const middy = require('@middy/core');
const AWS = require('aws-sdk');
const secretsManager = require('@middy/secrets-manager');
const cors = require('@middy/http-cors');
// const { app } = require('./app');
const config = require('./config');

AWS.config.update({ region: 'us-east-1' });

// let server = null;

// if (process.env.ENV) {
//   server = awsServerlessExpress.createServer(app);
// } else {
//   server = http.createServer(app);
//   server.listen(3000, () => console.log('Listening on port 3000!'));
// }

const { ApolloServer, gql } = require('apollo-server-lambda');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  
  // By default, the GraphQL Playground interface and GraphQL introspection
  // is disabled in "production" (i.e. when `process.env.NODE_ENV` is `production`).
  //
  // If you'd like to have GraphQL Playground and introspection enabled in production,
  // the `playground` and `introspection` options must be set explicitly to `true`.
  playground: true,
  introspection: true,
});

exports.handler = middy(server.createHandler())
  .use(cors())
  .use(secretsManager({
    cache: true,
    region: 'us-east-1',
    secrets: {
      DB_CREDENTIALS: config.DB_SECRET_NAME
    }
  }))
  .use(testMiddleware());

// const handler = middy(async (event, context) => {
//   config.DB_HOST = context.DB_CREDENTIALS.host;
//   config.DB_USERNAME = context.DB_CREDENTIALS.username;
//   config.DB_PASSWORD = context.DB_CREDENTIALS.password;
//   config.DB_NAME = 'postgres';
  
//   return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
// }).use(secretsManager({
//   cache: true,
//   region: 'us-east-1',
//   secrets: {
//     DB_CREDENTIALS: config.DB_SECRET_NAME
//   }
// }));

// const localInvoke = async () => {
//   await handler({}, {}, () => null);
// }

// if (!process.env.ENV) {
//   localInvoke();
// }

// exports.handler = handler;