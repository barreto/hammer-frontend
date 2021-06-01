import "../styles/global.scss";

import { ThemeProvider } from "@material-ui/styles";
import React from "react";

import Loading from "../components/Loading";
import HeaderContextProvider from "../contexts/HeaderContext";
import LoadingContextProvider from "../contexts/LoadingContext";
import theme from "../theme";

import type { AppProps } from "next/app";
import Header from "../components/Header";
function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles == null) return;
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <LoadingContextProvider>
        <HeaderContextProvider>
          <Loading />
          <Header />
          <Component {...pageProps} />
        </HeaderContextProvider>
      </LoadingContextProvider>
    </ThemeProvider>
  );
}
export default MyApp;
