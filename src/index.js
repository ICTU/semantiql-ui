import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route } from 'react-router-dom'

const client = new ApolloClient({
    // By default, this client will send queries to the
    //  `/graphql` endpoint on the same host
    // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
    // to a different host
    link: new HttpLink({ uri: '/api/'}),
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Route path='/' component={App} />
        </BrowserRouter>
    </ApolloProvider>
    , document.getElementById('root'));

// registerServiceWorker();
