import { Fade } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useContext } from 'react';

import LoadingContextProvider, { LoadingContext } from '../../contexts/LoadingContext';
import style from './style.module.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "90vw",
      background: "blue",
    },
  })
);

export default function Loading() {
  const { loadingStatus } = useContext(LoadingContext);
  const classes = useStyles();

  return (
    <Fade
      in={loadingStatus}
      style={{
        width: "100%",
        margin: "auto 0",
      }}
    >
      <div className={style.landingContainer}>
        <h1>Loading</h1>
        <img src="/hammer.svg" alt="Loading logo" />
      </div>
    </Fade>
  );
}
