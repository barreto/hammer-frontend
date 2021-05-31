import '../styles/global.scss';

import { ThemeProvider } from '@material-ui/styles';
import React from 'react';

import Header from '../components/Header';
import Loading from '../components/Loading';
import HeaderContextProvider from '../contexts/HeaderContext';
import LoadingContextProvider from '../contexts/LoadingContext';
import theme from '../theme';

import type { AppProps } from "next/app";
function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles !== null) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <LoadingContextProvider>
        <HeaderContextProvider>
          <Header />
          <Loading />
          <Component {...pageProps} />
        </HeaderContextProvider>
      </LoadingContextProvider>
    </ThemeProvider>
  );
}
export default MyApp;
