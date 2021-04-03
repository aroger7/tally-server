import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Global } from '@emotion/react';
import Header from '../Header';
import MainStats from 'src/components/MainStats';
import { normalize, fonts } from 'src/styles';
import * as Styles from './styles';

const client = new ApolloClient({
  uri: 'https://ut6r8etige.execute-api.us-east-1.amazonaws.com/dev/graphql',
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Global styles={normalize} />
      <Global styles={fonts} />
      <Styles.App>
        <Styles.HeaderContainer>
          <Header />
        </Styles.HeaderContainer>
        <Styles.Body>
          <MainStats />
        </Styles.Body>
      </Styles.App>
    </ApolloProvider>
  );
}

export default App;