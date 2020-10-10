import { DocumentNode } from "graphql";
import { initializeApollo } from "./apolloClient";

export default async (query: [DocumentNode]) => {
  const apolloClient = initializeApollo();

  query.forEach(async (query) => {
    await apolloClient.query({ query });
  });

  return {
    props: { initialApolloProps: apolloClient.cache.extract() },
  };
};
