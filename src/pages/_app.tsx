import '../styles/global.scss';

import Header from '../components/Header';
import Loading from '../components/Loading';
import HeaderContextProvider from '../contexts/HeaderContext';
import LoadingContextProvider from '../contexts/LoadingContext';

import type { AppProps } from "next/app";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoadingContextProvider>
      <HeaderContextProvider>
        <Header />
        <Loading />
        <Component {...pageProps} />
      </HeaderContextProvider>
    </LoadingContextProvider>
  );
}
export default MyApp;
