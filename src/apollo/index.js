import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const uri = process.env.NODE_ENV !== 'production'
  ? 'http://localhost:3010/graphql'
  : 'http://localhost:3010/graphql';

export default new ApolloClient({
  link: new HttpLink({
    uri,
  }),
  cache: new InMemoryCache(),
});
