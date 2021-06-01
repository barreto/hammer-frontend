import Head from 'next/head';
import { SyntheticEvent, useContext, useEffect, useState } from 'react';

import GenericBodyPage from '../../components/GenericBodyPage';
import { HeaderContext } from '../../contexts/HeaderContext';
import { LoadingContext } from '../../contexts/LoadingContext';

export default function Containers() {
  const { setHeaderStatus } = useContext(HeaderContext);
  const { setLoadingStatus } = useContext(LoadingContext);

  useEffect(() => {
    setHeaderStatus(true);
    setLoadingStatus(false);
  }, []);

  return (
    <>
      <Head>
        <title>Hammer | Containers</title>
      </Head>
      <GenericBodyPage>
        <h2>Containers page</h2>
      </GenericBodyPage>
    </>
  );
}
