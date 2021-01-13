import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Header from '../Header';

const client = new ApolloClient({
  uri: 'https://ut6r8etige.execute-api.us-east-1.amazonaws.com/dev/graphql',
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <Header />
      </div>
    </ApolloProvider>
  );
}

export default App;