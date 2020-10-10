import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <h1>wrapper</h1>
      <Component {...pageProps} />
    </div>
  );
}
