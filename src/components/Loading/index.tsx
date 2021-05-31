import { Fade } from '@material-ui/core';
import { useContext } from 'react';

import LoadingContextProvider, { LoadingContext } from '../../contexts/LoadingContext';
import style from './style.module.scss';

export default function Loading() {
  const { loadingStatus } = useContext(LoadingContext);

  return (
    <Fade in={loadingStatus} style={{ width: "100%" }}>
      <div className={style.landingContainer}>
        <h1>Loading</h1>
        <img src="/hammer.svg" alt="Loading logo" />
      </div>
    </Fade>
  );
}
