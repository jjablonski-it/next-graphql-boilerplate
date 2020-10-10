import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import { useApollo } from "../lib/apolloClient";

export default function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloProps);
  return (
    <ApolloProvider client={client}>
      <h1>Wrapper</h1>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
