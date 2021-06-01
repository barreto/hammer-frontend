import { Container, createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import { ReactNode, SyntheticEvent, useContext, useEffect, useState } from 'react';

import { HeaderContext } from '../../contexts/HeaderContext';
import { LoadingContext } from '../../contexts/LoadingContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    content: {
      padding: "2rem 0 0",
      height: "calc(100vh - 64px)",
    },
  })
);

export default function GenericBodyPage({ children }: { children: ReactNode }) {
  const classes = useStyles();
  const { setHeaderStatus } = useContext(HeaderContext);
  const { setLoadingStatus } = useContext(LoadingContext);

  useEffect(() => {
    setHeaderStatus(true);
    setLoadingStatus(false);
  }, []);

  return (
    <Container fixed>
      <Grid container spacing={2} direction="row">
        <Grid container direction="row" justify="flex-end">
          <Grid item xs={11}>
            <div className={classes.content}>{children}</div>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
