import { useMemo } from "react";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ErrorLink, onError } from "@apollo/client/link/error";
import { getToken, setToken } from "../utils/authToken";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const getHeaders = () => {
  if (typeof window === "undefined") return {}; // Add headers client side only

  const authToken = getToken();
  console.log("createHeaders", { Authorization: `Bearer ${authToken}` });
  if (!authToken) return {};

  return { Authorization: `Bearer ${authToken}` };
};

const withTokenLink = setContext(() => {
  const authToken = getToken();
  if (authToken) return authToken; // TODO check if token is not expired

  console.log("get new authToken");

  return fetch("http://localhost:4000/refresh_token", {
    credentials: "include",
  })
    .then((res) => res.json())
    .then(({ authToken }) => {
      if (authToken) {
        setToken(authToken);
        return authToken;
      }
    });
});

const resetTokenLink = onError(({ networkError }) => {
  if (networkError) setToken("");
});

const headersLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }) => ({
    headers: {
      ...getHeaders(),
      ...headers,
    },
  }));
  return forward(operation);
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql", // Server URL (must be absolute)
  credentials: "include", // Additional fetch() options like `credentials` or `headers`
});

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: ApolloLink.from([
      withTokenLink,
      resetTokenLink,
      headersLink,
      httpLink,
    ]),
    cache: new InMemoryCache({
      //   typePolicies: {
      //     Query: {
      //       fields: {
      //         allPosts: concatPagination(),
      //       },
      //     },
      //   },
    }),
  });
};

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const useApollo = (initialState) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};
