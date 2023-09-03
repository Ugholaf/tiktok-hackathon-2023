import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
});
const link = from([
  errorLink,
  // new HttpLink({ uri: "https://t-money-api-vugb2.ondigitalocean.app/graphql" }),
  new HttpLink({ uri: "https://t-money-api-vugb2.ondigitalocean.app/graphql" }),
]);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});
