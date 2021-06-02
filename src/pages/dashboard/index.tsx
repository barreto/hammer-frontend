import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { BarChart } from '@material-ui/icons';
import Head from 'next/head';
import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';

import GenericBodyPage from '../../components/GenericBodyPage';
import { HeaderContext } from '../../contexts/HeaderContext';
import { LoadingContext } from '../../contexts/LoadingContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    emptyContainer: {
      maxWidth: "240px",
      textAlign: "center",
      height: "70vh",
      margin: "0vh auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    emtpyIcon: {
      fontSize: "200px",
      color: "#777",
    },
    emtpyLabel: {},
  })
);
export default function Dashboard() {
  const classes = useStyles();
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
        <Grid className={classes.emptyContainer}>
          <Typography>Ainda não há dados suficientes na sua conta :(</Typography>
          <BarChart className={classes.emtpyIcon} />
          <Typography>
            Continue gerênciando sua infraestrutura conosco e em breve usufruirá de uma análise
            gráfica robusta!
          </Typography>
        </Grid>
      </GenericBodyPage>
    </>
  );
}
