import Head from 'next/head';
import { SyntheticEvent, useContext, useEffect, useState } from 'react';

import GenericBodyPage from '../../components/GenericBodyPage';
import { HeaderContext } from '../../contexts/HeaderContext';
import { LoadingContext } from '../../contexts/LoadingContext';

export default function Home() {
  const { setHeaderStatus } = useContext(HeaderContext);
  const { setLoadingStatus } = useContext(LoadingContext);

  useEffect(() => {
    setHeaderStatus(true);
    setLoadingStatus(false);
  }, []);

  return (
    <>
      <Head>
        <title>Hammer | Home</title>
      </Head>
      <GenericBodyPage>
        <h2>Home page</h2>
      </GenericBodyPage>
    </>
  );
}
