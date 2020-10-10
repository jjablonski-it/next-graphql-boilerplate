import { ApolloProvider } from "@apollo/client";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { AppProps } from "next/app";
import { useApollo } from "../lib/apolloClient";
import theme from "../src/theme";

export default function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloProps);
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}
