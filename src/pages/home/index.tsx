import { Container } from '@material-ui/core';
import Head from 'next/head';
import { SyntheticEvent, useContext, useEffect, useState } from 'react';

import { HeaderContext } from '../../contexts/HeaderContext';
import { LoadingContext } from '../../contexts/LoadingContext';

export default function home() {
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
      <Container fixed>
        <h2>Home page</h2>
      </Container>
    </>
  );
}
