const awsServerlessExpress = require('aws-serverless-express');
const http = require('http');
const middy = require('middy');
const AWS = require('aws-sdk');
const secretsManager = require('@middy/secrets-manager');
const { app } = require('./app');
const config = require('./config');

AWS.config.update({ region: 'us-east-1' });

let server = null;

if (process.env.ENV) {
  server = awsServerlessExpress.createServer(app);
} else {
  server = http.createServer(app);
  server.listen(3000, () => console.log('Listening on port 3000!'));
}

const handler = middy(async (event, context) => {
  config.DB_HOST = context.DB_CREDENTIALS.host;
  config.DB_USERNAME = context.DB_CREDENTIALS.username;
  config.DB_PASSWORD = context.DB_CREDENTIALS.password;
  config.DB_NAME = 'postgres';
  
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
}).use(secretsManager({
  cache: true,
  region: 'us-east-1',
  secrets: {
    DB_CREDENTIALS: config.DB_SECRET_NAME
  }
}));

const localInvoke = async () => {
  await handler({}, {}, () => null);
}

if (!process.env.ENV) {
  localInvoke();
}

exports.handler = handler;