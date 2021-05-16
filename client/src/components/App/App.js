import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Global } from '@emotion/react';
import Header from '../Header';
import MainStats from 'src/components/MainStats';
import IndividualGameStats from 'src/components/IndividualGameStats';
import { normalize, fonts } from 'src/styles';
import * as Styles from './styles';

const client = new ApolloClient({
  uri: 'https://ut6r8etige.execute-api.us-east-1.amazonaws.com/dev/graphql',
  // uri: 'http://localhost:3000/dev/graphql',
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
          <Global styles={normalize} />
          <Global styles={fonts} />
          <Styles.App>
            <Styles.HeaderContainer>
              <Header />
            </Styles.HeaderContainer>
            <Styles.Body>
              <Switch>
                <Route path="/apps/:id" exact>
                  <IndividualGameStats />
                </Route>
                <Route path="/" exact>
                  <MainStats />
                </Route>
              </Switch>
            </Styles.Body>
          </Styles.App>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;