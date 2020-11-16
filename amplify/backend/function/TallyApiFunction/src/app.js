require('./config');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');

// const apps = require('./routes/apps');
// const playerCounts = require('./routes/playerCounts');
// const { getDatabase } = require('./middleware/db');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: (parent, args, context) => {
      console.log(context.req.body);
      return 'Hello world!'
    },
  },
};

const apolloServer = new ApolloServer({ 
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: ({ req }) => ({
    req
  })
});
const middlewares = apolloServer.getMiddleware();
console.log(middlewares);
const app = express();

// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     allowedHeaders: ['x-auth', 'Content-Type'],
//     exposedHeaders: ['x-auth']
//   })
// );
// app.use(express.static(path.resolve(__dirname, '../../dist')));
// app.use(bodyParser.json());
// app.use((req, res, next) => {
//   console.log(req.body);
//   next()
// });
// app.use(getDatabase);
apolloServer.applyMiddleware({ app });
// app.use((req, res, next) => {
//   Object.keys(req).forEach(key => console.log(key));
//   console.log(req.body);
//   // console.log(req.body);
//   next();
// });

// app.use('/app', apps);
// app.use('/playercount', playerCounts);

module.exports = { app };