import React from 'react';
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { ApolloProvider } from '@apollo/react-hooks';

import schema from './mock/index';
import MainLayout from "./components/MainLayout";
import MainPage from './components/MainPage';
import OthersPage from './components/OthersPage';
import ListingPage from './components/ListingPage';

const hashHistory = createBrowserHistory({ basename: process.env.PUBLIC_URL });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({ schema })
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router history={hashHistory}>
          <MainLayout >
              <Route path="/" exact component={MainPage} />
              <Route path="/listings" exact component={ListingPage} />
              <Route path="/others" exact component={OthersPage} />
          </MainLayout>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
