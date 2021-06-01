import Head from 'next/head';
import { SyntheticEvent, useContext, useEffect, useState } from 'react';

import GenericBodyPage from '../../components/GenericBodyPage';
import { HeaderContext } from '../../contexts/HeaderContext';
import { LoadingContext } from '../../contexts/LoadingContext';

export default function Dashboard() {
  const { setHeaderStatus } = useContext(HeaderContext);
  const { setLoadingStatus } = useContext(LoadingContext);

  useEffect(() => {
    setHeaderStatus(true);
    setLoadingStatus(false);
  }, []);

  return (
    <>
      <Head>
        <title>Hammer | Dashboard</title>
      </Head>
      <GenericBodyPage>
        <h2>Dashboard page</h2>
      </GenericBodyPage>
    </>
  );
}
