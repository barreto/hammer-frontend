import Head from 'next/head';
import { SyntheticEvent, useContext, useEffect, useState } from 'react';

import { HeaderContext } from '../../contexts/HeaderContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import style from './styles.module.scss';

export default function home() {
  const { setHeaderStatus } = useContext(HeaderContext);
  const { setLoadingStatus } = useContext(LoadingContext);

  useEffect(() => {
    setHeaderStatus(true);
    setLoadingStatus(false);
  }, []);

  return (
    <div>
      <Head>
        <title>Hammer | Home</title>
      </Head>
      <div className={style.homeContainer}>
        <h2>Home page</h2>
      </div>
    </div>
  );
}
