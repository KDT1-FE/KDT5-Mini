import GlobalStyle from "@styles/GlobalStyle";
import { theme } from "@styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import React, { useEffect, useState } from "react";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }
  return (
    <>
      <Head>
        <title>Work Fairy</title>
      </Head>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <Component {...pageProps} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
