const middy = require('@middy/core');
const AWS = require('aws-sdk');
const secretsManager = require('@middy/secrets-manager');
const cors = require('@middy/http-cors');
const { ApolloServer, makeExecutableSchema } = require('apollo-server-lambda');
const { range, pattern, ValidateDirectiveVisitor } = require('@profusion/apollo-validation-directives');
const { resolver } = require('graphql-sequelize');
const { createContext, EXPECTED_OPTIONS_KEY } = require('dataloader-sequelize');

const { getDatabase } = require('./middleware/db');
const config = require('./config');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

AWS.config.update({ region: 'us-east-1' });

const schema = makeExecutableSchema({
  typeDefs: [
    ...typeDefs,
    ...ValidateDirectiveVisitor.getMissingCommonTypeDefs(),
    ...range.getTypeDefs(),
    ...pattern.getTypeDefs()
  ],
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  schemaDirectives: { range, pattern }
})

ValidateDirectiveVisitor.addValidationResolversToSchema(schema);

const server = new ApolloServer({ 
  schema,
  context: ({ event, context }) => {
    const { db } = context;
    const dataloaderContext = createContext(db.sequelize);
    resolver.contextToOptions = {
      dataloaderContext: [EXPECTED_OPTIONS_KEY]
    };
    return {
      ...context,
      dataloaderContext
    };
  },
  playground: true,
  introspection: true
});

const secrets = {};
if (!process.env.IS_OFFLINE) {
  secrets.DB_CREDENTIALS = config.DB_SECRET_NAME;
}

exports.handler = middy(server.createHandler())
  .use(cors())
  .use(secretsManager({
    cache: true,
    region: 'us-east-1',
    secrets
  }))
  .use(getDatabase());