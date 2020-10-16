import { useMemo } from "react";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { getToken } from "../utils/authToken";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createHeaders = async () => {
  if (typeof window === "undefined") return {}; // Add headers client side only

  let authToken = getToken();
  if (!authToken) {
    const res = await fetch("http://localhost:4000/refresh_token", {
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);

    if (data.error) return {};
    authToken = data.authToken;
  }

  return { Authorization: `Bearer ${authToken}` };
};

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: "http://localhost:4000/graphql", // Server URL (must be absolute)
      credentials: "include", // Additional fetch() options like `credentials` or `headers`
      headers: createHeaders(),
    }),
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
