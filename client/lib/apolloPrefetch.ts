import { DocumentNode } from "graphql";
import { initializeApollo } from "./apolloClient";

export default async (queries: [DocumentNode]) => {
  const apolloClient = initializeApollo();

  for (const query of queries) {
    await apolloClient.query({ query });
  }

  return {
    props: { initialApolloProps: apolloClient.cache.extract() },
  };
};
